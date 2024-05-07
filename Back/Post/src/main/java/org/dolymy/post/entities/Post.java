package org.dolymy.post.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;



import java.io.Serializable;
import java.util.Date;
import java.util.List;
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "posts")

public class Post implements Serializable {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "idPost")
    Integer id;
    String title ;
    String description ;
    @Temporal(TemporalType.DATE)
    Date postDate;
    String attachment ;
    Integer visibility;
    @Column(name = "userPost")
    Integer idUser;

    @OneToMany(mappedBy="post", cascade = CascadeType.ALL)
    private List<Comment> comments;


}