package org.dolymy.quiz.entities;


import lombok.*;
import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;


import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Document(collection="certificate")

public class Certificate implements Serializable {
    @Id
    private String certificate_id;
    private byte[] attachment;
    private String studentId;


//    @DBRef
//    private User student;

    private Result result;


//    public String getStudentUsername() {
//        if (student != null) {
//            return student.getUsername();
//        } else {
//            return null;
//        }
//    }

//    public void setStudentUsername(String username) {
//        if (student == null) {
//            student = new User();
//        }
//        student.setUsername(username);
//    }



}