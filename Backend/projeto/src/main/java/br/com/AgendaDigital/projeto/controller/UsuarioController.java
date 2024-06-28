package br.com.AgendaDigital.projeto.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.AgendaDigital.projeto.dtos.UsuarioDtos;
import br.com.AgendaDigital.projeto.services.UsuarioService;
import br.com.AgendaDigital.projeto.model.User;

@RestController
// @CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/usuario")

public class UsuarioController {
	private static final Logger log = LoggerFactory.getLogger(UsuarioController.class);
	final UsuarioService usuarioService;
	final BCryptPasswordEncoder passwordEncoder;

	public UsuarioController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}

	@PostMapping
	public ResponseEntity<Object> saveUsuario(@RequestBody @Valid UsuarioDtos usuarioDtos) {
		var usuario = new User();
		BeanUtils.copyProperties(usuarioDtos, usuario);
		// Criptografar a senha antes de salvar
		usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.save(usuario));
	}

	@GetMapping
	public ResponseEntity<List<User>> getAllUsuarios() {
		return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAll());
	}

	@SuppressWarnings("rawtypes")
	@GetMapping("/{id}")
	public ResponseEntity getOneUsuario(@PathVariable(value = "id") UUID id) {
		Optional<User> usuarioOptional = usuarioService.findById(id);
		if (!usuarioOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(usuarioOptional.get());
	}

	@DeleteMapping("/{id_usuario}")
	public ResponseEntity<Object> deleteUsuario(@PathVariable(value = "id_usuario") UUID id) {
		Optional<User> usuarioOptional = usuarioService.findById(id);

		if (!usuarioOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario not found.");
		}

		try {
			usuarioService.delete(usuarioOptional.get());
			return ResponseEntity.noContent().build(); // Retorno 204 No Content
		} catch (Exception e) {
			log.error("Erro ao excluir usuario:", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir usuario.");
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Object> updateUsuario(@PathVariable(value = "id") UUID id,
			@RequestBody @Valid UsuarioDtos usuarioDtos) {
		Optional<User> usuarioOptional = usuarioService.findById(id);
		if (!usuarioOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario not found.");
		}
		var usuario = new User();
		BeanUtils.copyProperties(usuarioDtos, usuario);
		usuario.setId_usuario(usuarioOptional.get().getId_usuario());

		  // Criptografar a senha antes de salvar
		  usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
		return ResponseEntity.status(HttpStatus.OK).body(usuarioService.save(usuario));
	}

}
