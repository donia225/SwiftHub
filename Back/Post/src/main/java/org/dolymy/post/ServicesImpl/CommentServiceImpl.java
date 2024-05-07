package org.dolymy.post.ServicesImpl;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import org.dolymy.post.daos.CommentDao;
import org.dolymy.post.daos.PostDao;
import org.dolymy.post.entities.Comment;

import org.dolymy.post.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {



    private CommentDao commentDao;
    private PostDao postDao;

    @Override
    public List<Comment> findAllComments() {
        return this.commentDao.findAll();
    }

    public Optional<Comment> findCommentById(Integer id) {
        return this.commentDao.findById(id);
    }
    //delete
    @Override
    public void deleteCommentById(Integer id) {
        this.commentDao.deleteById(id);
    }
    //Add

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment, @RequestParam int idPost) {
        try {
            // Affiche le commentaire passé en argument à votre script Node.js
            System.out.println("Comment passed  : " + " ' "+ comment.getContent()+" ' ");
            // Chemin vers votre script Node.js
            String nodeScriptPath = "C:\\Users\\MSI\\Desktop\\SwiftHub\\Back\\Post\\src\\main\\resources\\static\\perpectiveAnalyzer.js";
            ProcessBuilder processBuilder = new ProcessBuilder("node", nodeScriptPath, comment.getContent());
            // Démarrage du processus
            Process process = processBuilder.start();
            // Lecture de la sortie du processus
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder result = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                result.append(line);
            }
            // Attendre la fin du processus
            int exitCode = process.waitFor();
            // Vérifier le code de sortie
            if (exitCode != 0) {
                throw new RuntimeException("Erreur lors de l'exécution du script Node.js");
            }

            String analysisResult = result.toString();
            // Vérifie si le commentaire est toxique
            if (isToxic(analysisResult)) {
                // Si toxique, retourne un message d'avertissement
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            } else {
                // Sinon, ajoutez le commentaire
                comment.setCommentDate(new Date());
                comment.setPost(postDao.findById(idPost).orElse(null));
                Comment savedComment = commentDao.save(comment);
                // Envoi du message Kafka
                String message ="User "+ savedComment.getIdUser() + " commented post " + savedComment.getPost().getId();
                kafkaTemplate.send("notifications", message);
                return ResponseEntity.ok(savedComment);
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Méthode pour vérifier si le commentaire est toxique
    private boolean isToxic(String analysisResult) {
        // Analyser le résultat de l'analyse de toxicité pour déterminer si le commentaire est toxique
        // Vous devrez extraire le score de toxicité du résultat JSON et le comparer à un seuil
        // Si le score de toxicité est supérieur à 0.5, retourne true (toxique), sinon retourne false (non toxique)

        // Analysez le résultat JSON pour extraire le score de toxicité
        // Par exemple, vous pouvez utiliser une bibliothèque JSON comme Jackson ou Gson pour analyser la réponse JSON
        // Voici un exemple d'utilisation de Gson pour extraire le score de toxicité (à adapter selon votre structure JSON) :
        JsonObject jsonObject = new Gson().fromJson(analysisResult, JsonObject.class);
        JsonObject attributeScores = jsonObject.get("attributeScores").getAsJsonObject();
        JsonObject toxicityScore = attributeScores.get("TOXICITY").getAsJsonObject();
        double score = toxicityScore.get("summaryScore").getAsJsonObject().get("value").getAsDouble();

        // Comparer le score de toxicité au seuil
        if (score > 0.5) {
            // Si le score de toxicité est supérieur à 0.5, le commentaire est toxique
            // Vous pouvez afficher un message ou effectuer d'autres actions nécessaires
            System.out.println("Error adding comment : Comment contain bad words");
            return true;
        } else {
            // Sinon, le commentaire n'est pas toxique
            return false;
        }
    }
    @Override
    public Comment updateComment(Comment comment,int idPost) {
        comment.setPost(postDao.findById(idPost).orElse(null));
        return this.commentDao.save(comment);
    }

    @Override
    public List<Comment> findCommentsByPostId(Integer postId) {
        return commentDao.findPostById(postId);
    }
}