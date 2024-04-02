package org.dolymy.quiz.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="question")
public class Question implements Serializable {

    @Id
    private String question_id;
    private String questiontxt;

    private List<Answer> answers;

    @DocumentReference(collection = "quiz")
    @JsonBackReference
    private Quiz quiz;
}
