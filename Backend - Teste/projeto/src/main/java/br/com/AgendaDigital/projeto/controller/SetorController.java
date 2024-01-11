package br.com.AgendaDigital.projeto.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import javax.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
