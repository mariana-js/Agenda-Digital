package br.com.AgendaDigital.projeto.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

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

import br.com.AgendaDigital.dtos.RamalDtos;
import br.com.AgendaDigital.projeto.model.Ramal;
import br.com.AgendaDigital.projeto.services.RamalService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/ramal")

public class RamalController {
	final RamalService ramalService;

	public RamalController(RamalService ramalService) {
		this.ramalService = ramalService;
	}

	@PostMapping
	public ResponseEntity<Object> saveEndereco(@RequestBody @Valid RamalDtos ramalDtos) {
		var ramal = new Ramal();
		BeanUtils.copyProperties(ramalDtos, ramal);
		ramal.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
		return ResponseEntity.status(HttpStatus.CREATED).body(ramalService.save(ramal));
	}

	@GetMapping
	public ResponseEntity<List<Ramal>> getAllRamais() {
		return ResponseEntity.status(HttpStatus.OK).body(ramalService.findAll());
	}

	@GetMapping("/{id_ramal}")
	public ResponseEntity getOneUsuario(@PathVariable(value = "id_ramal") String id_ramal) {
		Optional<Ramal> ramalOptional = ramalService.findById(id_ramal);
		if (!ramalOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ramal not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(ramalOptional.get());
	}

	@DeleteMapping("/{id_ramal}")
	public ResponseEntity<Object> delete(@PathVariable(value = "id_ramal") String id_ramal) {
		Optional<Ramal> ramalOptional = ramalService.findById(id_ramal);
		if (!ramalOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ramal not found.");
		}
		ramalService.delete(ramalOptional.get());
		return ResponseEntity.status(HttpStatus.OK).body("Ramal deleted successfully.");
	}

	@PutMapping("/{id_ramal}")
	public ResponseEntity<Object> updateRamal(@PathVariable(value = "id_ramal") String id_ramal,
			@RequestBody @Valid RamalDtos ramalDtos) {
		Optional<Ramal> ramalOptional = ramalService.findById(id_ramal);
		if (!ramalOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ramal not found.");
		}

		var ramal = new Ramal();
		BeanUtils.copyProperties(ramalDtos, ramal);
		ramal.setNumero_ramal(ramalOptional.get().getNumero_ramal());
		return ResponseEntity.status(HttpStatus.OK).body(ramalService.save(ramal));
	}
	// @Autowired
	// private IRamal dao;
	// /*@GetMapping("/ramal")
	// public String text() {
	// return "Endpoint de Ramal ";
	// }*/
	// @GetMapping
	// public List<Ramal> listaRamais() {
	// return (List<Ramal>) dao.findAll();

	// }

	// @PostMapping
	// public Ramal criarRamal (@RequestBody Ramal ramal) {
	// Ramal ramalNovo = dao.save(ramal);
	// return ramalNovo;
	// }

	// @PutMapping
	// public Ramal alterarRamal (@RequestBody Ramal ramal) {
	// Ramal ramalNovo = dao.save(ramal);
	// return ramalNovo;
	// }

	// @DeleteMapping("/{id_ramal}")
	// public Optional<Ramal> excluirRamal (@PathVariable Long id_ramal){
	// Optional<Ramal> ramal = dao.findById(id_ramal);
	// dao.deleteById(id_ramal);
	// return ramal;
	// }
}
