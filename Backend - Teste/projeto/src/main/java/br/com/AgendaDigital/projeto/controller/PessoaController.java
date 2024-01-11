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
import br.com.AgendaDigital.dtos.PessoaDtos;
import br.com.AgendaDigital.projeto.model.Pessoa;
import br.com.AgendaDigital.projeto.services.PessoaService;

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
		// if (pessoaService.existsByCelular_corporativo(pessoaDtos.getCelular_corporativo())) {
		// 	return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Celular corporativo is already in use!");
		// }
		// if (pessoaService.existsByCelular_pessoal(pessoaDtos.getCelular_pessoal())) {
		// 	return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Celular pessoal is already in use!");
		// }
		// if (pessoaService.existsByTelefone(pessoaDtos.getTelefone())) {
		// 	return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Telefone is already in use!");
		// }	

		var pessoa = new Pessoa();
		BeanUtils.copyProperties(pessoaDtos, pessoa);
		pessoa.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
		return ResponseEntity.status(HttpStatus.CREATED).body(pessoaService.save(pessoa));
	}

	// @Autowired
	// private IPessoa dao;

	// /*@GetMapping("/pessoa")
	// public String text() {
	// return "Endpoint de Pessoa ";
	// }*/

	// @GetMapping
	// public List<Pessoa> listaPessoas() {
	// return (List<Pessoa>) dao.findAll();

	// }

	// @PostMapping
	// public Pessoa criarSetor (@RequestBody Pessoa pessoa) {
	// Pessoa pessoaNovo = dao.save(pessoa);
	// return pessoaNovo;
	// }

	// @PutMapping
	// public Pessoa alterarPessoa (@RequestBody Pessoa pessoa) {
	// Pessoa pessoaNovo = dao.save(pessoa);
	// return pessoaNovo;
	// }

	// @DeleteMapping("/{id_pessoa}")
	// public Optional<Pessoa> excluirPessoa (@PathVariable Long id_pessoa){
	// Optional<Pessoa> pessoa = dao.findById(id_pessoa);
	// dao.deleteById(id_pessoa);
	// return pessoa;
	// }
}
