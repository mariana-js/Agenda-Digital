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

import com.api.agendadigital.dtos.PessoaDtos;
import com.api.agendadigital.model.Pessoa;
import com.api.agendadigital.services.PessoaService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/pessoa")

public class PessoaController {

	final PessoaService pessoaService;

	public PessoaController(PessoaService pessoaService) {
		this.pessoaService = pessoaService;
	}

	@PostMapping
	public ResponseEntity<Object> savePessoa(@RequestBody @Valid PessoaDtos pessoaDtos) {

		if (pessoaService.existsByEmail(pessoaDtos.getEmail())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Email is already in use!");
		}
		// if
		// (pessoaService.existsByCelular_corporativo(pessoaDtos.getCelular_corporativo()))
		// {
		// return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Celular
		// corporativo is already in use!");
		// }
		// if (pessoaService.existsByCelular_pessoal(pessoaDtos.getCelular_pessoal())) {
		// return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Celular
		// pessoal is already in use!");
		// }
		// if (pessoaService.existsByTelefone(pessoaDtos.getTelefone())) {
		// return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Telefone is
		// already in use!");
		// }

		var pessoa = new Pessoa();
		BeanUtils.copyProperties(pessoaDtos, pessoa);
		pessoa.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
		return ResponseEntity.status(HttpStatus.CREATED).body(pessoaService.save(pessoa));
	}

	@GetMapping
	public ResponseEntity<List<Pessoa>> getAllPessoas() {
		return ResponseEntity.status(HttpStatus.OK).body(pessoaService.findAll());
	}

	@GetMapping("/{id_pessoa}")
	public ResponseEntity getOneUsuario(@PathVariable(value = "id_pessoa") UUID id_pessoa) {
		Optional<Pessoa> pessoaOptional = pessoaService.findById(id_pessoa);
		if (!pessoaOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(pessoaOptional.get());
	}

	@DeleteMapping("/{id_pessoa}")
	public ResponseEntity<Object> deletePessoa(@PathVariable(value = "id_pessoa") UUID id_pessoa) {
		Optional<Pessoa> pessoaOptional = pessoaService.findById(id_pessoa);
		if (!pessoaOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa not found.");
		}
		pessoaService.delete(pessoaOptional.get());
		return ResponseEntity.status(HttpStatus.OK).body("Pessoa deleted successfully.");
	}

	@PutMapping("/{id_pessoa}")
	public ResponseEntity<Object> updatePessoa(@PathVariable(value = "id_pessoa") UUID id_pessoa,
			@RequestBody @Valid PessoaDtos pessoaDtos) {
		Optional<Pessoa> pessoaOptional = pessoaService.findById(id_pessoa);
		if (!pessoaOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa not found.");
		}

		var pessoa = new Pessoa();
		BeanUtils.copyProperties(pessoaDtos, pessoa);
		pessoa.setId_pessoa(pessoaOptional.get().getId_pessoa());
		return ResponseEntity.status(HttpStatus.OK).body(pessoaService.save(pessoa));
	}
}
