package com.cadastro.ravecareapp.service;
import com.cadastro.ravecareapp.dto.request.AnamnesisRequest; import com.cadastro.ravecareapp.dto.response.AnamnesisResponse; import com.cadastro.ravecareapp.entity.*; import com.cadastro.ravecareapp.enums.UserRole; import com.cadastro.ravecareapp.exception.*; import com.cadastro.ravecareapp.repository.*;
import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional; import java.util.UUID;
@Service public class AnamnesisService {
 private final AnamnesisRepository anamneses; private final UserRepository users;
 public AnamnesisService(AnamnesisRepository a, UserRepository u){anamneses=a;users=u;}
 @Transactional public AnamnesisResponse saveForPatient(UUID id, AnamnesisRequest r){ User p=patient(id); Anamnesis a=anamneses.findByPatientId(id).orElseGet(()->new Anamnesis(p,r.currentComplaint(),r.medicalHistory(),r.medications(),r.allergies())); if(a.getId()!=null)a.update(r.currentComplaint(),r.medicalHistory(),r.medications(),r.allergies()); return response(anamneses.save(a)); }
 @Transactional(readOnly=true) public AnamnesisResponse findForPatient(UUID id){return response(anamneses.findByPatientId(id).orElseThrow(()->new ResourceNotFoundException("Anamnesis not found")));}
 private User patient(UUID id){User u=users.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found")); if(u.getRole()!=UserRole.PATIENT)throw new BusinessException("Anamnesis is available only for patients");return u;}
 private AnamnesisResponse response(Anamnesis a){return new AnamnesisResponse(a.getId(),a.getPatient().getId(),a.getCurrentComplaint(),a.getMedicalHistory(),a.getMedications(),a.getAllergies(),a.getUpdatedAt());}
}
