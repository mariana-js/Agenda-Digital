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
import org.springframework.web.bind.annotation.RestController;

import br.com.AgendaDigital.projeto.dtos.PessoaDtos;
import br.com.AgendaDigital.projeto.model.Pessoa;
import br.com.AgendaDigital.projeto.services.PessoaService;

@RestController
// @CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/pessoa")

public class PessoaController {

    private static final Logger log = LoggerFactory.getLogger(UsuarioController.class);
    final PessoaService pessoaService;

    public PessoaController(PessoaService pessoaService) {
        this.pessoaService = pessoaService;
    }

    @PostMapping
    public ResponseEntity<Object> savePessoa(@RequestBody @Valid PessoaDtos pessoaDtos) {

        // if (pessoaService.existsByEmail(pessoaDtos.getEmail())) {
        // 	return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Email is already in use!");
        // }
        // if
        // (pessoaService.existsByCelular_corporativo(pessoaDtos.getCelular_corporativo()))
        // {
        // return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Celular
        // corporativo is already in use!");
        // }
        // if (pessoaService.existsByCelular_pessoal(pessoaDtos.getCelular_pessoal())) {
        // return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Celular
        // pessoal is already in use!");
        // }
        // if (pessoaService.existsByTelefone(pessoaDtos.getTelefone())) {
        // return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Telefone is
        // already in use!");
        // }
        var pessoa = new Pessoa();
        BeanUtils.copyProperties(pessoaDtos, pessoa);
        pessoa.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.CREATED).body(pessoaService.save(pessoa));
    }

    @GetMapping
    public ResponseEntity<List<Pessoa>> getAllPessoas() {
        return ResponseEntity.status(HttpStatus.OK).body(pessoaService.findAll());
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/{id_pessoa}")
    public ResponseEntity getOneUsuario(@PathVariable(value = "id_pessoa") UUID id_pessoa) {
        Optional<Pessoa> pessoaOptional = pessoaService.findById(id_pessoa);
        if (!pessoaOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(pessoaOptional.get());
    }

    @DeleteMapping("/{id_pessoa}")
    public ResponseEntity<Object> deletePessoa(@PathVariable(value = "id_pessoa") UUID id_pessoa) {
        Optional<Pessoa> pessoaOptional = pessoaService.findById(id_pessoa);
        if (!pessoaOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa not found.");
        }
        try {
            pessoaService.delete(pessoaOptional.get());
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Erro ao excluir usuario:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir pessoa.");
        }
    }

    @PutMapping("/{id_pessoa}")
    public ResponseEntity<Object> updatePessoa(@PathVariable(value = "id_pessoa") UUID id_pessoa,
            @RequestBody @Valid PessoaDtos pessoaDtos) {
        Optional<Pessoa> pessoaOptional = pessoaService.findById(id_pessoa);
        if (!pessoaOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa not found.");
        }

        var pessoa = new Pessoa();
        BeanUtils.copyProperties(pessoaDtos, pessoa);
        pessoa.setId_pessoa(pessoaOptional.get().getId_pessoa());
        return ResponseEntity.status(HttpStatus.OK).body(pessoaService.save(pessoa));
    }
}
