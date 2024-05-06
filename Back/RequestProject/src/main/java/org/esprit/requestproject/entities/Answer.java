package org.esprit.requestproject.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;


@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "answers")
public class Answer implements Serializable {
    @Transient
    public static final String SEQUENCE_NAME = "answers_sequence";
    @Id
    private long id;
    private String responseText;
    @DateTimeFormat
    private Date responseDate;
    private String attachment;

    @DocumentReference(collection = "requests")
    @JsonBackReference
    private Request request;


}
