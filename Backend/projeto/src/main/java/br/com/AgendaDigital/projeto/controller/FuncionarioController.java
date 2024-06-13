package br.com.AgendaDigital.projeto.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.AgendaDigital.projeto.dtos.FuncionarioDtos;
import br.com.AgendaDigital.projeto.model.Funcionario;
import br.com.AgendaDigital.projeto.services.FuncionarioService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/funcionario")

public class FuncionarioController {

	private static final Logger log = LoggerFactory.getLogger(UsuarioController.class);
	final FuncionarioService funcionarioService;

	public FuncionarioController(FuncionarioService funcionarioService) {
		this.funcionarioService = funcionarioService;
	}

	@PostMapping
	public ResponseEntity<Object> saveFuncionario(@RequestBody @Valid FuncionarioDtos FuncionarioDtos) {
		var funcionario = new Funcionario();
		BeanUtils.copyProperties(FuncionarioDtos, funcionario);
		funcionario.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
		return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioService.save(funcionario));
	}

    // @PostMapping
    // public ResponseEntity<Object> saveFuncionario(@RequestBody @Valid FuncionarioDtos funcionarioDtos,
    //         @RequestParam("foto") MultipartFile foto) {
    //     try {
    //         var funcionario = new Funcionario();
    //         BeanUtils.copyProperties(funcionarioDtos, funcionario);
    //         funcionario.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
    //         funcionario.setFoto(foto.getBytes());
    //         return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioService.save(funcionario));
    //     } catch (IOException e) {
    //         log.error("Erro ao salvar imagem do funcionario:", e);
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                 .body("Erro ao salvar imagem do funcionario.");
    //     }
    // }
	@GetMapping
	public List<Funcionario> getFuncionariosPorMes(@RequestParam("mes") int mes) {
		// Chame o serviço para obter os funcionários filtrados pelo mês
		return funcionarioService.getFuncionariosPorMes(mes);
	}

	@GetMapping("/all")
	public ResponseEntity<List<Funcionario>> getAllFuncionarios() {
		return ResponseEntity.status(HttpStatus.OK).body(funcionarioService.findAll());
	}

	@SuppressWarnings("rawtypes")
	@GetMapping("/{id_funcionario}")
	public ResponseEntity getOneUsuario(@PathVariable(value = "id_funcionario") UUID id_funcionario) {
		Optional<Funcionario> funcionarioOptional = funcionarioService.findById(id_funcionario);
		if (!funcionarioOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionario not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(funcionarioOptional.get());
	}

	@DeleteMapping("/{id_funcionario}")
	public ResponseEntity<Object> deleteFuncionario(@PathVariable(value = "id_funcionario") UUID id_funcionario) {
		Optional<Funcionario> funcionarioOptional = funcionarioService.findById(id_funcionario);
		if (!funcionarioOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionario not found.");
		}
		try {
			funcionarioService.delete(funcionarioOptional.get());
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			log.error("Erro ao excluir funcionario:", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir funcionario.");
		}
	}

	@PutMapping("/{id_funcionario}")
	public ResponseEntity<Object> updateFuncionario(@PathVariable(value = "id_funcionario") UUID id_funcionario,
			@RequestBody @Valid FuncionarioDtos funcionarioDtos) {
		Optional<Funcionario> funcionarioOptional = funcionarioService.findById(id_funcionario);
		if (!funcionarioOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionario not found.");
		}

		var funcionario = new Funcionario();
		BeanUtils.copyProperties(funcionarioDtos, funcionario);
		funcionario.setId_funcionario(funcionarioOptional.get().getId_funcionario());
		return ResponseEntity.status(HttpStatus.OK).body(funcionarioService.save(funcionario));
	}

}
