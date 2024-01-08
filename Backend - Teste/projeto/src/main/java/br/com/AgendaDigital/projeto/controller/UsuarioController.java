package br.com.AgendaDigital.projeto.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuario")

public class UsuarioController {
	// @Autowired
	// private IUsuario dao;

	// @GetMapping
	// public List<Usuario> listaUsuarios() {
	// 	return (List<Usuario>) dao.findAll();
		
	// }
	
	// @PostMapping
	// public Usuario criarUsuario (@RequestBody Usuario usuario) {
	// 	Usuario usuarioNovo = dao.save(usuario);
	// 	return usuarioNovo;
	// }

	// @PutMapping
	// public Usuario alterarUsuario (@RequestBody Usuario usuario) {
	// 	Usuario usuarioNovo = dao.save(usuario);
	// 	return usuarioNovo; 
	// }
	 
	// @DeleteMapping("/{id}")
	// public Optional<Usuario> excluirUsuario (@PathVariable Long id){
	// 	Optional<Usuario> usuario = dao.findById(id);
	// 	dao.deleteById(id);
	// 	return usuario;
	// }
	// /*@GetMapping("/usuario")
	// public String text() {
	// 	return "Endpoint de Usuario ";
	// }*/

}
