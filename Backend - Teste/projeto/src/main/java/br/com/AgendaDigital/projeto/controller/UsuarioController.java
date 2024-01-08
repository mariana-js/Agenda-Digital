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

import br.com.AgendaDigital.dtos.UsuarioDtos;
import br.com.AgendaDigital.projeto.model.Usuario;
import br.com.AgendaDigital.projeto.services.UsuarioService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/usuario")

public class UsuarioController {
	
	final UsuarioService usuarioService;
	
	public UsuarioController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}

	@PostMapping
	public ResponseEntity<Object> saveUsuario (@RequestBody @Valid UsuarioDtos usuarioDtos){
		var usuario = new Usuario();
		BeanUtils.copyProperties(usuarioDtos, usuario);
		usuario.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.save(usuario));
	}
	
	
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
