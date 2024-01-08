package br.com.AgendaDigital.projeto.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@CrossOrigin("*")
@RequestMapping("/pessoa")

public class PessoaController {
	// @Autowired
	// private IPessoa dao;
	
	// /*@GetMapping("/pessoa")
	// public String text() {
	// 	return "Endpoint de Pessoa ";
	// }*/
	
	// @GetMapping
	// public List<Pessoa> listaPessoas() {
	// 	return (List<Pessoa>) dao.findAll();
		
	// }
	
	// @PostMapping
	// public Pessoa criarSetor (@RequestBody Pessoa pessoa) {
	// 	Pessoa pessoaNovo = dao.save(pessoa);
	// 	return pessoaNovo;
	// }

	// @PutMapping
	// public Pessoa alterarPessoa (@RequestBody Pessoa pessoa) {
	// 	Pessoa pessoaNovo = dao.save(pessoa);
	// 	return pessoaNovo;
	// }
	 
	// @DeleteMapping("/{id_pessoa}")
	// public Optional<Pessoa> excluirPessoa (@PathVariable Long id_pessoa){
	// 	Optional<Pessoa> pessoa = dao.findById(id_pessoa);
	// 	dao.deleteById(id_pessoa);
	// 	return pessoa;
	// }
}
