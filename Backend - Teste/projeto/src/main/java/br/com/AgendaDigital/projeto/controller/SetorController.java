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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.AgendaDigital.dtos.SetorDtos;
import br.com.AgendaDigital.projeto.model.Setor;
import br.com.AgendaDigital.projeto.services.SetorService;

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

	// @Autowired
	// private ISetor dao;

	// /*@GetMapping("/setor")
	// public String text() {
	// return "Endpoint de Setor ";
	// }*/

	// @GetMapping
	// public List<Setor> listaSetores() {
	// return (List<Setor>) dao.findAll();

	// }

	// @PostMapping
	// public Setor criarSetor (@RequestBody Setor setor) {
	// Setor setorNovo = dao.save(setor);
	// return setorNovo;
	// }

	// @PutMapping
	// public Setor alterarSetor (@RequestBody Setor setor) {
	// Setor setorNovo = dao.save(setor);
	// return setorNovo;
	// }

	// @DeleteMapping("/{id_setor}")
	// public Optional<Setor> excluirSetor(@PathVariable Long id_setor){
	// Optional<Setor> setor = dao.findById(id_setor);
	// dao.deleteById(id_setor);
	// return setor;
	// }
}
