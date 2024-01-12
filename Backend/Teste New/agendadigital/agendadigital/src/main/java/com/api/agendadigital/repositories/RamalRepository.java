package com.api.agendadigital.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.agendadigital.model.Ramal;

@Repository
public interface RamalRepository extends JpaRepository<Ramal, String> {

}
