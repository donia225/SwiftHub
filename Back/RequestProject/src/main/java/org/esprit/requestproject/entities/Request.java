package org.esprit.requestproject.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.annotation.CreatedDate;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "requests" )

public class Request implements Serializable {

    @Transient
    public static final String SEQUENCE_NAME = "requests_sequence";
    @Id
    private long idRequest;
    @TextIndexed
    private String title;
    @TextIndexed
    private String description ;
    @TextIndexed
    private Status status; //c'est pas l'étudiant qui gére ça
    private CategoryName categoryName;


    @CreatedDate
    private Date creationDate;

    // Assurez-vous d'avoir des getters et setters
    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }


    private String idUser;


    @JsonBackReference
    @JsonIgnore
    private List<Answer> answers = new ArrayList<>();


    @Override
    public String toString() {
        return "Request{" +
                "idRequest=" + idRequest +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", categoryName=" + categoryName +
                ", creationDate=" + creationDate +
                ", idUser=" + idUser +
                ", answers=" + answers +
                '}';
    }
}
