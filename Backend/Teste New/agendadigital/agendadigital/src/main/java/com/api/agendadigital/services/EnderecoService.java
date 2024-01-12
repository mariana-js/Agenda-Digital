package com.api.agendadigital.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.agendadigital.model.Endereco;
import com.api.agendadigital.repositories.EnderecoRepository;

@Service
public class EnderecoService {
    final EnderecoRepository enderecoRepository;

    public EnderecoService(EnderecoRepository enderecoRepository) {
        this.enderecoRepository = enderecoRepository;
    }

    @Transactional
    public Endereco save(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }

    public Optional<Endereco> findById(UUID id_endereco) {
        return enderecoRepository.findById(id_endereco);
    }

    public List<Endereco> findAll() {
        return enderecoRepository.findAll();

    }

    public void delete(Endereco endereco) {
        enderecoRepository.delete(endereco);
    }

}
