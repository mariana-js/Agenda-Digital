package br.com.AgendaDigital.projeto.inteface;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import br.com.AgendaDigital.projeto.model.Ramal;

public interface IRamal extends CrudRepository<Ramal, UUID>{

}
