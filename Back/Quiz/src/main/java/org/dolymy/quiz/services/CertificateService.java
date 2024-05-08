package org.dolymy.quiz.services;

import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import com.itextpdf.layout.properties.TextAlignment;
import org.dolymy.quiz.entities.Certificate;
import org.dolymy.quiz.repos.CertificateRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

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
    public byte[] generateCertificatePdf() throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        // Create a PDF writer
        PdfWriter pdfWriter = new PdfWriter(outputStream);

        // Create a PDF document
        PdfDocument pdfDocument = new PdfDocument(pdfWriter);
        // Set document with landscape orientation
        pdfDocument.setDefaultPageSize(PageSize.A4.rotate());

        // Create a document
        Document document = new Document(pdfDocument);

        // Add certificate content
        Paragraph title = new Paragraph("Accomplishment Certificate")
                .setFontColor(ColorConstants.BLUE)
                .setBold()
                .setFontSize(24)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(20);
        document.add(title);

        document.add(new Paragraph("In recognition of your achievement of passing the quiz of our soft skills sessions")
                .setFontSize(14)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(30));

        // Add the signature image
        // Ajouter la signature fictive
        PdfFont font = PdfFontFactory.createFont();
        Paragraph signature = new Paragraph("Signature")
                .setFont(font)
                .setFontSize(18)
                .setFontColor(ColorConstants.BLACK)
                .setBold();
        document.add(signature);

        // Ajouter le texte "Esprit" en dessous de la signature
        Paragraph espritText = new Paragraph("Esprit")
                .setFont(font)
                .setFontSize(12)
                .setFontColor(ColorConstants.BLACK);
        document.add(espritText);

        // Close the document
        document.close();
        pdfDocument.close();

        return outputStream.toByteArray();
    }





}
