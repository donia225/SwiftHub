package org.dolymy.workshop.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Workshop implements Serializable {

    @Id
    private Long workshop_id;
    private String title;
    private String description;
    private Integer capacity;

    private Date start_date;
    private Date end_date;
    private String location;
    private String link;

    private List<Feedback> feedbacks;

}
