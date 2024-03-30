package org.dolymy.workshop.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.dolymy.workshop.enums.RatingType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Feedback implements Serializable {

    @Id
    private Long feedback_id;
    private String description;
    private RatingType rating;

}
