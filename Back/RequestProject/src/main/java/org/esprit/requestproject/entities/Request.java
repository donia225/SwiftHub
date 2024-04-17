package org.esprit.requestproject.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;

import org.springframework.data.annotation.CreatedDate;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.io.Serializable;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "requests" )
public class Request implements Serializable {
    @Id
    private String idRequest;
    private String title;
    private String description ;
    private Status status; //c'est pas l'étudiant qui gére ça

    @CreatedDate // Annotation pour générer automatiquement la date de création
    private Date creationDate;


    private String attachment;
    private boolean visibility; //request public ychoufouha ness kol wala privé ychoufha ken ma3neya bel amr



    @DocumentReference(collection = "categories")
    @JsonBackReference
    private Category category;

    public String getIdRequest() {
        return idRequest;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public boolean isVisibility() {
        return visibility;
    }

    public void setVisibility(boolean visibility) {
        this.visibility = visibility;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
