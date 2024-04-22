package org.dolymy.quiz.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="quiz")
public class Quiz implements Serializable {

   @Id
private String quiz_id;
    private String quizName;
    private LocalDateTime quizTime;

    @JsonIgnore
    private List<Question> questions = new ArrayList<>();





}
