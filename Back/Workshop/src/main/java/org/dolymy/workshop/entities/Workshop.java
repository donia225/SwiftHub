package org.dolymy.workshop.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDate;
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

    private LocalDate start_date;
    private LocalDate end_date;
    private String location;
  //  private String link;
    private String userId;
    private List<String> joinedUsersId;
    private String meetingId;
    @JsonManagedReference
    private List<Feedback> feedbacks;

}
