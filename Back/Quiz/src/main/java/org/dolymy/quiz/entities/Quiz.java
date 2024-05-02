package org.dolymy.quiz.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.dolymy.quiz.services.SequenceGeneratorService;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection="quiz")

public class Quiz implements Serializable {

    @Transient
    public static final String SEQUENCE_NAME = "quiz_sequence";

    @Transient
    private SequenceGeneratorService sequenceGenerator; // Inject SequenceGeneratorService

    @Id
    private long quizId;
    private String quizName;
    private LocalDateTime quizTime;


    private List<Question> questions = new ArrayList<>();





}
