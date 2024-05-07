package org.dolymy.post.ServicesImpl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.dolymy.post.daos.PostDao;
import org.dolymy.post.entities.Post;
import org.dolymy.post.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {


    @Autowired
    private PostDao postDao;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Override
    public List<Post> findAllPosts() {
        return postDao.findAll();
    }

    @Override
    public Optional<Post> findPostById(Integer id) {
        return postDao.findById(id);
    }

    @Override
    public void deletePostById(Integer id) {
        postDao.deleteById(id);
    }

    @Override
    public Post updatePost(Post post) {
        return postDao.save(post);
    }



    @PostMapping("")
    @ResponseBody
    public ResponseEntity<Post> addPost(@RequestBody Post post) {
        try {
            // Construire la requête d'analyse du post
            JsonObject requestObject = new JsonObject();
            JsonObject commentObject = new JsonObject();
            commentObject.addProperty("text", post.getDescription());
            requestObject.add("comment", commentObject);
            JsonObject requestedAttributes = new JsonObject();
            requestedAttributes.addProperty("TOXICITY", "{}");
            requestObject.add("requestedAttributes", requestedAttributes);

            // Envoyer la requête à votre script Node.js
            String nodeScriptPath = "C:\\Users\\MSI\\Desktop\\SwiftHub\\Back\\Post\\src\\main\\resources\\static\\perpectiveAnalyzer.js";
            ProcessBuilder processBuilder = new ProcessBuilder("node", nodeScriptPath, requestObject.toString());
            Process process = processBuilder.start();

            // Lire la réponse de votre script Node.js
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder result = new StringBuilder();
            String line;
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

            // Vérifier si le post est toxique
            if (isToxic(analysisResult)) {
                // Si toxique, retourner un message d'avertissement
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            } else {
                // Sinon, ajouter le post
                post.setPostDate(new Date());
                Post savedPost = postDao.save(post);
                // Envoyer le message Kafka
                String message = "User " + savedPost.getIdUser() + " added a post. ";
                kafkaTemplate.send("notifications", message);
                post.setVisibility(1);
                return ResponseEntity.ok(savedPost);
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
            System.out.println("Error adding post : Post contain bad words");
            return true;
        } else {
            // Sinon, le commentaire n'est pas toxique
            return false;
        }
    }




    @Override
    public List<Post> findPostByKeyword(String keyword) {
        return postDao.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }

    @Override
    public List<Post> findPostByPostDate(Date postDate) {
        return postDao.findByPostDate(postDate);
    }

   /*
    @Override
    public List<Comment> findCommentsByPostId(Integer postId) {
        Optional<Post> post = postDao.findById(postId);
        return post.map(Post::getComments).orElse(Collections.emptyList());
    }

    */
}
