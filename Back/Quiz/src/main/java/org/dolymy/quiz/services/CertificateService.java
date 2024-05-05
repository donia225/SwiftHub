package org.dolymy.quiz.services;

import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import com.itextpdf.layout.properties.TextAlignment;
import org.dolymy.quiz.entities.Certificate;
import org.dolymy.quiz.entities.User;
import org.dolymy.quiz.repos.CertificateRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.Optional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.UUID;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import com.itextpdf.kernel.colors.ColorConstants;

@Service
public class CertificateService {

    @Value("${attachment.path}")
    private String attachmentPath;

    private final CertificateRepository certificateRepository;

    public CertificateService(CertificateRepository certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

//    public void generatePDF(String outputPath) throws FileNotFoundException {
//        PdfWriter pdfWriter = new PdfWriter(new FileOutputStream(outputPath));
//        PdfDocument pdfDocument = new PdfDocument(pdfWriter);
//        pdfDocument.setDefaultPageSize(PageSize.A4);
//        Document document = new Document(pdfDocument);
//        document.add(new Paragraph("Congrats, you got your certificate!"));
//        document.close();
//        pdfDocument.close();
//    }

    public Certificate getCertificateById(String certificate_id) {
        Optional<Certificate> optionalCertificate = certificateRepository.findById(certificate_id);
        return optionalCertificate.orElse(null);
    }

//    public void save(MultipartFile attachment) {
//
//        String dir = filePath;
//        try {
//            Path path = Paths.get(dir);
//            Files.createDirectories(path);
//            attachment.transferTo(new File(dir + "/" + attachment.getOriginalFilename()));
//        } catch (IOException e) {
//            System.out.println(e.getMessage());
//        }
//    }

    public Certificate addCertificate(MultipartFile attachment, Certificate certificate) {

        return this.certificateRepository.save(certificate);

    }

    public void generateCertificatePdf() throws FileNotFoundException {
        String fileName = "certificate.pdf";
        String outputPath = attachmentPath + "/" + fileName;

        // Create a PDF writer
        PdfWriter pdfWriter = new PdfWriter(new FileOutputStream(outputPath));

        // Create a PDF document
        PdfDocument pdfDocument = new PdfDocument(pdfWriter);
        // Set document with landscape orientation
        pdfDocument.setDefaultPageSize(PageSize.A4.rotate());

        // Create a document
        Document document = new Document(pdfDocument);

        // Add certificate content
        Paragraph title = new Paragraph("Certificate of Accomplishment")
                .setFontColor(ColorConstants.BLUE)
                .setBold()
                .setFontSize(24)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(20);
        document.add(title);

        Paragraph recipient = new Paragraph("This certificate is presented to:")
                .setFontSize(14)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(20);
        document.add(recipient);

        Paragraph recipientName = new Paragraph("Recipient's Name")
                .setBold()
                .setFontSize(18)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(30);
        document.add(recipientName);

        Paragraph message = new Paragraph("In recognition of your achievement of passing the quiz of our soft skills sessions.")
                .setFontSize(14)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(30);
        document.add(message);

        Paragraph signature = new Paragraph("Authorized Signature")
                .setBold()
                .setFontSize(16)
                .setTextAlignment(TextAlignment.RIGHT)
                .setMarginTop(100);
        document.add(signature);

        // Close the document
        document.close();
        pdfDocument.close();

    }

}