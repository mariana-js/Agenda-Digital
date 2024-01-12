package com.api.agendadigital.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.agendadigital.model.Setor_Ramal;

@Repository
public interface Setor_RamalRepository extends JpaRepository<Setor_Ramal, UUID> {

}
