package org.dolymy.workshop.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "meeting")
@Builder
public class Meeting implements Serializable {
    @Id
    private String meeting_id;
    private String link;
    private Long accessKey;
    private String workshop_id;

}