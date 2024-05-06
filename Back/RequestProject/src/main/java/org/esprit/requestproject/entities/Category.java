package org.esprit.requestproject.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.annotation.Id;
import lombok.*;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor // Ajout du constructeur par défaut
@Builder
@Document(collection = "categories" )
public class Category implements Serializable {
    @Transient
    public static final String SEQUENCE_NAME = "categories_sequence";
    @Id
    private long idCategory; // Utiliser idCategory comme identifiant principal

    private String categoryName;


    @JsonBackReference
    @JsonIgnore
    private List<Request> requests = new ArrayList<>();

    @Override
    public String toString() {
        return "Category{" +
                "idCategory='" + idCategory + '\'' +
                ", categoryName='" + categoryName + '\'' +
                ", requests=" + requests +
                '}';
    }
}
