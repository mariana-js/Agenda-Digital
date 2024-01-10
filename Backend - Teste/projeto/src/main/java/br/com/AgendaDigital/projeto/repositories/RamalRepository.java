package br.com.AgendaDigital.projeto.repositories;

import br.com.AgendaDigital.projeto.model.Ramal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RamalRepository extends JpaRepository<Ramal, String >{
    
}
