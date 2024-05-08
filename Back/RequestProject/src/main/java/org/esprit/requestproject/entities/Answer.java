package org.esprit.requestproject.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
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
    @CreatedDate
    private Date responseDate;

    private String idUser;
    public Date getResponseDate() {
        return responseDate;
    }

    public void setResponseDate(Date responseDate) {
        this.responseDate = responseDate;
    }

    @DocumentReference(collection = "requests")
    private Request request;

    @Override
    public String toString() {
        return "Answer{" +
                "id=" + id +
                ", responseText='" + responseText + '\'' +
                ", responseDate=" + responseDate +
                ", idUser='" + idUser + '\'' +
                ", request=" + request +
                '}';
    }
}
