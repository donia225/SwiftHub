package org.dolymy.quiz.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "result")
public class Result  implements Serializable {
    @Id
    private String result_id;

    @DBRef
    private Quiz quiz;

//    @DBRef
//    private User student;


    private Certificate certificate;

    //private User user;

    private List<Answer> answers;

    private double score;
    private String studentId;






}
