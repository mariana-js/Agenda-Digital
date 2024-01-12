package com.api.agendadigital.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.agendadigital.model.Endereco;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, UUID> {

}