package org.dolymy.quiz.controllers;



import lombok.RequiredArgsConstructor;
import org.dolymy.quiz.entities.Certificate;
import org.dolymy.quiz.services.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@RequestMapping("/api/quizzes/certificate")


public class CertificateController {
    private final CertificateService certificateService;


    @Autowired
    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @GetMapping("/generateCertificate")
    public String generateCertificate(@RequestParam String certificate_id) throws FileNotFoundException {
        String outputPath = "path/to/" + certificate_id + "_certificate.pdf";

        Certificate certificate = certificateService.getCertificateById(certificate_id);
        if (certificate != null) {
            certificateService.generatePDF(outputPath);
            return "Certificate generated successfully at: " + outputPath;
        } else {
            return "Certificate not found for ID: " + certificate_id;
        }
    }

    @PostMapping("/addCertificate")
    public void addCertificate(@RequestParam MultipartFile attachment)  {
         certificateService.save(attachment);
    }

}
