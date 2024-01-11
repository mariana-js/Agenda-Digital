package br.com.AgendaDigital.projeto.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.AgendaDigital.projeto.model.Setor_Ramal;

@Repository
public interface  Setor_RamalRepository   extends JpaRepository<Setor_Ramal, UUID >{
    
}
