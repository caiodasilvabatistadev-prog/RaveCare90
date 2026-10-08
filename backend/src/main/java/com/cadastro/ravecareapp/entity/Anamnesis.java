package com.cadastro.ravecareapp.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity @Table(name = "anamneses")
public class Anamnesis {
 @Id @GeneratedValue(strategy = GenerationType.UUID) private UUID id;
 @OneToOne(optional = false) @JoinColumn(name = "patient_id", nullable = false, unique = true) private User patient;
 @Column(name="current_complaint", nullable=false, columnDefinition="TEXT") private String currentComplaint;
 @Column(columnDefinition="TEXT") private String medicalHistory;
 @Column(columnDefinition="TEXT") private String medications;
 @Column(columnDefinition="TEXT") private String allergies;
 @Column(nullable=false, updatable=false) private LocalDateTime createdAt;
 @Column(nullable=false) private LocalDateTime updatedAt;
 protected Anamnesis() {}
 public Anamnesis(User patient, String complaint, String history, String meds, String allergies) { this.patient=patient; update(complaint,history,meds,allergies); }
 @PrePersist void created(){ createdAt=LocalDateTime.now(); updatedAt=createdAt; } @PreUpdate void updated(){updatedAt=LocalDateTime.now();}
 public void update(String complaint,String history,String meds,String allergy){currentComplaint=complaint;medicalHistory=history;medications=meds;allergies=allergy;}
 public UUID getId(){return id;} public User getPatient(){return patient;} public String getCurrentComplaint(){return currentComplaint;} public String getMedicalHistory(){return medicalHistory;} public String getMedications(){return medications;} public String getAllergies(){return allergies;} public LocalDateTime getCreatedAt(){return createdAt;} public LocalDateTime getUpdatedAt(){return updatedAt;}
}
