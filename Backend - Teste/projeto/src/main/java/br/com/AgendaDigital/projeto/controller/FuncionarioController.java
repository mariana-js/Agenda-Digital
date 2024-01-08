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
import br.com.AgendaDigital.dtos.FuncionarioDtos;
import br.com.AgendaDigital.projeto.model.Funcionario;
import br.com.AgendaDigital.projeto.services.FuncionarioService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/funcionario")

public class FuncionarioController {

	final FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }
	
	@PostMapping
	public ResponseEntity<Object> saveFuncionario (@RequestBody @Valid FuncionarioDtos FuncionarioDtos){
		var funcionario = new Funcionario();
		BeanUtils.copyProperties(FuncionarioDtos, funcionario);
		funcionario.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
		return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioService.save(funcionario));
	}


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
