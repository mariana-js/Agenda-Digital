package br.com.AgendaDigital.projeto.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/setor")

public class SetorController {
	// @Autowired
	// private ISetor dao;
	
	// /*@GetMapping("/setor")
	// public String text() {
	// 	return "Endpoint de Setor ";
	// }*/
	
	// @GetMapping
	// public List<Setor> listaSetores() {
	// 	return (List<Setor>) dao.findAll();
		
	// }
	
	// @PostMapping
	// public Setor criarSetor (@RequestBody Setor setor) {
	// 	Setor setorNovo = dao.save(setor);
	// 	return setorNovo;
	// }

	// @PutMapping
	// public Setor alterarSetor (@RequestBody Setor setor) {
	// 	Setor setorNovo = dao.save(setor);
	// 	return setorNovo;
	// }
	 
	// @DeleteMapping("/{id_setor}")
	// public Optional<Setor> excluirSetor(@PathVariable Long id_setor){
	// 	Optional<Setor> setor = dao.findById(id_setor);
	// 	dao.deleteById(id_setor);
	// 	return setor;
	// }
}
