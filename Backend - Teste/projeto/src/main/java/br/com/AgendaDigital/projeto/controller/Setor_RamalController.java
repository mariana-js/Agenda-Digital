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
import br.com.AgendaDigital.dtos.Setor_RamalDtos;
import br.com.AgendaDigital.projeto.model.Setor_Ramal;
import br.com.AgendaDigital.projeto.services.Setor_RamalService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/setor_ramal")
public class Setor_RamalController {

    final Setor_RamalService setor_RamalService;

    public Setor_RamalController(Setor_RamalService setor_RamalService) {
        this.setor_RamalService = setor_RamalService;
    }

	@PostMapping
	public ResponseEntity<Object> saveSetor_Ramal(@RequestBody @Valid Setor_RamalDtos setor_RamalDtos) {
		var setor_ramal = new Setor_Ramal();
		BeanUtils.copyProperties(setor_RamalDtos, setor_ramal);
		setor_ramal.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
		return ResponseEntity.status(HttpStatus.CREATED).body(setor_RamalService.save(setor_ramal));
	}

}
