package com.api.agendadigital.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.agendadigital.dtos.SetorDtos;
import com.api.agendadigital.model.Setor;
import com.api.agendadigital.services.SetorService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/setor")
public class SetorController {
	final SetorService setorService;

	public SetorController(SetorService setorService) {
		this.setorService = setorService;
	}

	@PostMapping
	public ResponseEntity<Object> saveSetor(@RequestBody @Valid SetorDtos setorDtos) {
		var setor = new Setor();
		BeanUtils.copyProperties(setorDtos, setor);
		setor.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
		return ResponseEntity.status(HttpStatus.CREATED).body(setorService.save(setor));
	}

	@GetMapping
	public ResponseEntity<List<Setor>> getAllSetores() {
		return ResponseEntity.status(HttpStatus.OK).body(setorService.findAll());
	}

	@GetMapping("/{id_setor}")
	public ResponseEntity getOneUsuario(@PathVariable(value = "id_setor") UUID id_setor) {
		Optional<Setor> setorOptional = setorService.findById(id_setor);
		if (!setorOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Setor not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(setorOptional.get());
	}

	@DeleteMapping("/{id_setor}")
	public ResponseEntity<Object> deleteSetor(@PathVariable(value = "id_setor") UUID id_setor) {
		Optional<Setor> setorOptional = setorService.findById(id_setor);
		if (!setorOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Setor not found.");
		}
		setorService.delete(setorOptional.get());
		return ResponseEntity.status(HttpStatus.OK).body("Setor deleted successfully.");
	}

	@PutMapping("/{id_setor}")
	public ResponseEntity<Object> updateSetor(@PathVariable(value = "id_setor") UUID id_setor,
			@RequestBody @Valid SetorDtos setorDtos) {
		Optional<Setor> setorOptional = setorService.findById(id_setor);
		if (!setorOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Setor not found.");
		}
		var setor = new Setor();
		BeanUtils.copyProperties(setorDtos, setor);
		setor.setId_setor(setorOptional.get().getId_setor());
		return ResponseEntity.status(HttpStatus.OK).body(setorService.save(setor));
	}

}