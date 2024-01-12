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

import com.api.agendadigital.dtos.EnderecoDtos;
import com.api.agendadigital.model.Endereco;
import com.api.agendadigital.services.EnderecoService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/endereco")

public class EnderecoController {

	final EnderecoService enderecoService;

	public EnderecoController(EnderecoService enderecoService) {
		this.enderecoService = enderecoService;
	}

	@PostMapping
	public ResponseEntity<Object> saveEndereco(@RequestBody @Valid EnderecoDtos enderecoDtos) {
		var endereco = new Endereco();
		BeanUtils.copyProperties(enderecoDtos, endereco);
		endereco.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
		return ResponseEntity.status(HttpStatus.CREATED).body(enderecoService.save(endereco));
	}

	@GetMapping
	public ResponseEntity<List<Endereco>> getAllEndereco() {
		return ResponseEntity.status(HttpStatus.OK).body(enderecoService.findAll());
	}

	@GetMapping("/{id_endereco}")
	public ResponseEntity getOneUsuario(@PathVariable(value = "id_endereco") UUID id_endereco) {
		Optional<Endereco> enderecoOptional = enderecoService.findById(id_endereco);
		if (!enderecoOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Endereco not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(enderecoOptional.get());
	}

	@DeleteMapping("/{id_endereco}")
	public ResponseEntity<Object> deleteEndereco(@PathVariable(value = "id_endereco") UUID id_endereco) {
		Optional<Endereco> enderecoOptional = enderecoService.findById(id_endereco);
		if (!enderecoOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Endereco not found.");
		}
		enderecoService.delete(enderecoOptional.get());
		return ResponseEntity.status(HttpStatus.OK).body("Endereco deleted successfully.");
	}

	@PutMapping("/{id_endereco}")
	public ResponseEntity<Object> updateEndereco(@PathVariable(value = "id_endereco") UUID id_endereco,
			@RequestBody @Valid EnderecoDtos enderecoDtos) {
		Optional<Endereco> enderecoOptional = enderecoService.findById(id_endereco);
		if (!enderecoOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Endereco not found.");
		}
		var endereco = new Endereco();
		BeanUtils.copyProperties(enderecoDtos, endereco);
		endereco.setId_endereco(enderecoOptional.get().getId_endereco());

		return ResponseEntity.status(HttpStatus.OK).body(enderecoService.save(endereco));
	}

}
