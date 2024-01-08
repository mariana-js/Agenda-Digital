package br.com.AgendaDigital.projeto.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@CrossOrigin("*")
@RequestMapping("/funcionario")

public class FuncionarioController {
	// @Autowired
	// private IFuncionario dao;
	
	// /*@GetMapping("/funcionario")
	// public String text() {
	// 	return "Endpoint de Funcionario ";
	// }*/
	
	// @GetMapping
	// public List<Funcionario> listaFuncionarios() {
	// 	return (List<Funcionario>) dao.findAll();
		
	// }
	
	// @PostMapping
	// public Funcionario criarFuncionario (@RequestBody Funcionario funcionario) {
	// 	Funcionario funcionarioNovo = dao.save(funcionario);
	// 	return funcionarioNovo;
	// }

	// @PutMapping
	// public Funcionario alterarFuncionario (@RequestBody Funcionario funcionario) {
	// 	Funcionario funcionarioNovo = dao.save(funcionario);
	// 	return funcionarioNovo;
	// }
	 
	// @DeleteMapping("/{id_pessoa}")
	// public Optional<Funcionario> excluirFuncionario (@PathVariable Long id_pessoa){
	// 	Optional<Funcionario> funcionario = dao.findById(id_pessoa);
	// 	dao.deleteById(id_pessoa);
	// 	return funcionario;
	// }
}
