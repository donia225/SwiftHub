package org.dolymy.post.entities;

import jakarta.persistence.*;
import lombok.experimental.FieldDefaults;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import lombok.AccessLevel;
import lombok.Data;


import java.io.Serializable;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "posts")
public class Post implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPost")
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