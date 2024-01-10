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
import br.com.AgendaDigital.dtos.EnderecoDtos;
import br.com.AgendaDigital.projeto.model.Endereco;
import br.com.AgendaDigital.projeto.services.EnderecoService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/endereco")

public class EnderecoController {

	final EnderecoService enderecoService;
	
	public EnderecoController(EnderecoService enderecoService) {
		this.enderecoService = enderecoService;
	}

	@PostMapping
	public ResponseEntity<Object> saveEndereco (@RequestBody @Valid EnderecoDtos enderecoDtos){
		var endereco = new Endereco();
		BeanUtils.copyProperties(enderecoDtos, endereco);
		endereco.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
		return ResponseEntity.status(HttpStatus.CREATED).body(enderecoService.save(endereco));
	}

	// @Autowired
	// private IEnder
	//	this.enderecoDtos = private IEnd;("/endereco")
	// * public String text() {
	// * return "Endpoint de Endereco";
	// * }
	// */
	// @GetMapping
	// public List<Endereco> listaEnderecos() {
	// return (List<Endereco>) dao.findAll();

	// }

	// @PostMapping
	// public Endereco criarEndereco(@RequestBody Endereco endereco) {
	// Endereco enderecoNovo = dao.save(endereco);
	// return enderecoNovo;
	// }

	// @PutMapping
	// public Endereco alterarEndereco(@RequestBody Endereco endereco) {
	// Endereco enderecoNovo = dao.save(endereco);
	// return enderecoNovo;
	// }

	// @DeleteMapping("/{id_endereco}")
	// public Optional<Endereco> excluirEndereco(@PathVariable Long id_endereco) {
	// Optional<Endereco> endereco = dao.findById(id_endereco);
	// dao.deleteById(id_endereco);
	// return endereco;
	// }
}
