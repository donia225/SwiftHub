package org.dolymy.post.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;


import java.io.Serializable;
import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "comments")
public class Comment implements Serializable{
    @Transient
    @Id
    @Column(name = "idComment")
    Integer id;
    @Temporal(TemporalType.DATE)
    Date commentDate;
    @Column(name = "contentComment")
    String content;

    @Column(name = "userComment")
    int idUser;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ID")
    Post post;
}