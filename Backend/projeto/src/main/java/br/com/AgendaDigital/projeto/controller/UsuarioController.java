package br.com.AgendaDigital.projeto.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	public ResponseEntity<Object> saveUsuario(@RequestBody @Valid UsuarioDtos usuarioDtos) {
		var usuario = new Usuario();
		BeanUtils.copyProperties(usuarioDtos, usuario);
		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.save(usuario));
	}

	@GetMapping
	public ResponseEntity<List<Usuario>> getAllUsuarios() {
		return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity getOneUsuario(@PathVariable(value = "id") UUID id) {
		Optional<Usuario> usuarioOptional = usuarioService.findById(id);
		if (!usuarioOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(usuarioOptional.get());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteUsuario(@PathVariable(value = "id") UUID id) {
		Optional<Usuario> usuarioOptional = usuarioService.findById(id);
		if (!usuarioOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario not found.");
		}
		usuarioService.delete(usuarioOptional.get());
		return ResponseEntity.status(HttpStatus.OK).body("Usuario deleted successfully.");
	}

	@PutMapping("/{id}")
	public ResponseEntity<Object> updateUsuario(@PathVariable(value = "id") UUID id,
			@RequestBody @Valid UsuarioDtos usuarioDtos) {
		Optional<Usuario> usuarioOptional = usuarioService.findById(id);
		if (!usuarioOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario not found.");
		}
		var usuario = new Usuario();
		BeanUtils.copyProperties(usuarioDtos, usuario);
		usuario.setId(usuarioOptional.get().getId());
		return ResponseEntity.status(HttpStatus.OK).body(usuarioService.save(usuario));
	}

}
