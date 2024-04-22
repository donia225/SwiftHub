package org.dolymy.quiz.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="certificate")
public class Certificate implements Serializable {
    @Id
    private String certificate_id;
    private String attachement;

    @DBRef
    private User student;

    private Result result;
}
