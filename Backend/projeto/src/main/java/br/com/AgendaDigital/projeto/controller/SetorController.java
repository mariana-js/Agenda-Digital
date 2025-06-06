package br.com.AgendaDigital.projeto.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

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

import br.com.AgendaDigital.projeto.dtos.SetorDtos;
import br.com.AgendaDigital.projeto.model.Setor;
import br.com.AgendaDigital.projeto.services.SetorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
// @CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/setor")
public class SetorController {
	private static final Logger log = LoggerFactory.getLogger(SetorController.class);
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

	@SuppressWarnings("rawtypes")
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
	
		try {
			setorService.delete(setorOptional.get());
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			log.error("Erro ao excluir setor:", e); 
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir setor.");
		}
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
