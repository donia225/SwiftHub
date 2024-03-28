package org.dolymy.quiz.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@AllArgsConstructor
@Document(collection="quiz")
public class Quiz {
    @Id
private Long quiz_id;
    private String name;
    private double grade;
    private boolean isCorrect;

}
