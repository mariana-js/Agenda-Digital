package br.com.AgendaDigital.projeto.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@CrossOrigin("*")
@RequestMapping("/ramal")

public class RamalController {
	// @Autowired
	// private IRamal dao;
	// /*@GetMapping("/ramal")
	// public String text() {
	// 	return "Endpoint de Ramal ";
	// }*/
	// @GetMapping
	// public List<Ramal> listaRamais() {
	// 	return (List<Ramal>) dao.findAll();
		
	// }
	
	// @PostMapping
	// public Ramal criarRamal (@RequestBody Ramal ramal) {
	// 	Ramal ramalNovo = dao.save(ramal);
	// 	return ramalNovo;
	// }

	// @PutMapping
	// public Ramal alterarRamal (@RequestBody Ramal ramal) {
	// 	Ramal ramalNovo = dao.save(ramal);
	// 	return ramalNovo;
	// }
	 
	// @DeleteMapping("/{id_ramal}")
	// public Optional<Ramal> excluirRamal (@PathVariable Long id_ramal){
	// 	Optional<Ramal> ramal = dao.findById(id_ramal);
	// 	dao.deleteById(id_ramal);
	// 	return ramal;
	// }
}
