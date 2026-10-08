package com.cadastro.ravecareapp.controller;

import com.cadastro.ravecareapp.dto.request.AnamnesisRequest;
import com.cadastro.ravecareapp.dto.response.AnamnesisResponse;
import com.cadastro.ravecareapp.service.AnamnesisService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController @RequestMapping("/api/v1/anamneses")
public class AnamnesisController {
 private final AnamnesisService service; public AnamnesisController(AnamnesisService service){this.service=service;}
 @GetMapping("/me") public ResponseEntity<AnamnesisResponse> mine(Authentication auth){return ResponseEntity.ok(service.findForPatient(UUID.fromString(auth.getName())));}
 @PutMapping("/me") public ResponseEntity<AnamnesisResponse> saveMine(Authentication auth,@Valid @RequestBody AnamnesisRequest request){return ResponseEntity.ok(service.saveForPatient(UUID.fromString(auth.getName()),request));}
 @GetMapping("/patients/{patientId}") public ResponseEntity<AnamnesisResponse> byPatient(@PathVariable UUID patientId){return ResponseEntity.ok(service.findForPatient(patientId));}
}
