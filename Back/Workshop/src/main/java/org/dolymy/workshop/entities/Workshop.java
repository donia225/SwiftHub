package org.dolymy.workshop.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Document(collection = "workshop")
@Builder
public class Workshop implements Serializable {

    @Id
    private String workshop_id;
    private String title;
    private String description;
    private Integer capacity;

    private Date start_date;
    private Date end_date;
    private String location;
    private String link;
    @JsonManagedReference
    private List<Feedback> feedbacks;

}
