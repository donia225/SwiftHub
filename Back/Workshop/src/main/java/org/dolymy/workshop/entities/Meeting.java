package org.dolymy.workshop.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "meeting")
@Builder
public class Meeting implements Serializable {
    private String meeting_id;
    private String accessKey;
    private String userId;
    private String workshop_id;
    private List<String> participants;
}
