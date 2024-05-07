package org.dolymy.quiz.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.dolymy.quiz.services.SequenceGeneratorService;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="question")
public class Question implements Serializable {

    @Transient
    public static final String SEQUENCE_NAME = "question_sequence";

    @Transient
    private SequenceGeneratorService sequenceGenerator; // Inject SequenceGeneratorService

    @Id
    private long id;
    private String questiontxt;

    private List<Answer> answers;

    @DocumentReference(collection = "quiz")
    @JsonBackReference
    private Quiz quiz;
}
