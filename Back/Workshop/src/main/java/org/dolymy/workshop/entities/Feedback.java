package org.dolymy.workshop.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.dolymy.workshop.enums.RatingType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "feedback")
@Builder
public class Feedback implements Serializable {

    @Id
    private String feedback_id;
    private String description;
    private RatingType rating;
    private Date creationDate;
    private String userId;

    @DocumentReference(collection = "workshop")
    @JsonBackReference
    private Workshop workshop;

}
