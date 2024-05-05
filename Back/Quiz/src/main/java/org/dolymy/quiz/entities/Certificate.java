package org.dolymy.quiz.entities;

import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.element.Paragraph;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.FileNotFoundException;
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


    @DBRef
    private User student;

    private Result result;


    public String getStudentUsername() {
        if (student != null) {
            return student.getUsername();
        } else {
            return null;
        }
    }

    public void setStudentUsername(String username) {
        if (student == null) {
            student = new User();
        }
        student.setUsername(username);
    }



}