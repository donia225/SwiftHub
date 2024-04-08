package org.dolymy.post.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.Date;
import java.util.List;



@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "posts")
public class Post implements Serializable {

    @Transient
    @Id
    //@Column(name = "idPost")
    Integer id;
    String title ;
    String description ;
    @Temporal(TemporalType.DATE)
    Date postDate;
    String attachment ;

    @Column(name = "userPost")
    int idUser;

    @OneToMany(mappedBy="post")
    private List<Comment> comments;

  

}