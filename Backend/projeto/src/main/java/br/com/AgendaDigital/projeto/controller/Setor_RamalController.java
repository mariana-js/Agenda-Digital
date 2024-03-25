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

import br.com.AgendaDigital.dtos.Setor_RamalDtos;
import br.com.AgendaDigital.projeto.model.Setor_Ramal;
import br.com.AgendaDigital.projeto.model.Usuario;
import br.com.AgendaDigital.projeto.services.Setor_RamalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/setor_ramal")
public class Setor_RamalController {
	private static final Logger log = LoggerFactory.getLogger(UsuarioController.class);
	final Setor_RamalService setor_RamalService;

	public Setor_RamalController(Setor_RamalService setor_RamalService) {
		this.setor_RamalService = setor_RamalService;
	}

	@PostMapping
	public ResponseEntity<Object> saveSetor_Ramal(@RequestBody @Valid Setor_RamalDtos setor_RamalDtos) {
		var setor_ramal = new Setor_Ramal();
		BeanUtils.copyProperties(setor_RamalDtos, setor_ramal);
		setor_ramal.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
		return ResponseEntity.status(HttpStatus.CREATED).body(setor_RamalService.save(setor_ramal));
	}

	@GetMapping
	public ResponseEntity<List<Setor_Ramal>> getAllSetor_Ramal() {
		return ResponseEntity.status(HttpStatus.OK).body(setor_RamalService.findAll());
	}

	@GetMapping("/{id_setor_ramal}")
	public ResponseEntity getOneUsuario(@PathVariable(value = "id_setor_ramal") UUID id_setor_ramal) {
		Optional<Setor_Ramal> setor_ramalOptional = setor_RamalService.findById(id_setor_ramal);
		if (!setor_ramalOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Setor_ramal not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(setor_ramalOptional.get());
	}

	@DeleteMapping("/{id_setor_ramal}")
	public ResponseEntity<Object> deleteSetor_Ramal(@PathVariable(value = "id_setor_ramal") UUID id_setor_ramal) {
		Optional<Setor_Ramal> setor_ramalOptional = setor_RamalService.findById(id_setor_ramal);
		if (!setor_ramalOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Setor_ramal not found.");
		}
		try{
			setor_RamalService.delete(setor_ramalOptional.get());
			return ResponseEntity.noContent().build();
		}  catch (Exception e) { 
			log.error("Erro ao excluir setor ramal:", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Setor Ramal deleted successfully.");
		}
	}


	@PutMapping("/{id_setor_ramal}")
	public ResponseEntity<Object> updateSetor_Ramal(@PathVariable(value = "id_setor_ramal") UUID id_setor_ramal,
			@RequestBody @Valid Setor_RamalDtos setor_RamalDtos) {
		Optional<Setor_Ramal> setor_ramalOptional = setor_RamalService.findById(id_setor_ramal);
		if (!setor_ramalOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Setor_ramal not found.");
		}
		var setor_ramal = new Setor_Ramal();
		BeanUtils.copyProperties(setor_RamalDtos, setor_ramal);
		setor_ramal.setId_setor_ramal(setor_ramalOptional.get().getId_setor_ramal());
		return ResponseEntity.status(HttpStatus.OK).body(setor_RamalService.save(setor_ramal));
	}
}
