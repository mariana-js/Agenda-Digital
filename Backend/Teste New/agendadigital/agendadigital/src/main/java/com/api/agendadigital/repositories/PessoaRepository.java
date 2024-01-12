package com.api.agendadigital.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.agendadigital.model.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, UUID> {

    boolean existsByEmail(String email);

    // boolean existsByCelular_corporativo(String celular_corporativo);

    // boolean existsByCelular_pessoal(String celular_pessoal);

    // boolean existsByTelefone(String telefone);

}
