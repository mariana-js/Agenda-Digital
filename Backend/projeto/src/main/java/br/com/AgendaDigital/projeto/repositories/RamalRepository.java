package br.com.AgendaDigital.projeto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.AgendaDigital.projeto.model.Ramal;

@Repository
public interface RamalRepository extends JpaRepository<Ramal, String> {

}
