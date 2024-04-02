package org.dolymy.quiz.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="answer")
public class Answer implements Serializable {

    @Id
    private String answer_id;
    private String answerTxt;
    private boolean correctAnswer;


}
