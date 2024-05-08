package org.dolymy.quiz.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.dolymy.quiz.services.SequenceGeneratorService;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="answer")
public class Answer implements Serializable {
    @Transient
    public static final String SEQUENCE_NAME = "answer_sequence";
    @Transient
    private SequenceGeneratorService sequenceGenerator;
    @Id
    private Long answer_id;
    private String answerTxt;
    private boolean correctAnswer;
    private int point;
    private String userId;
    private String studentId;


}
