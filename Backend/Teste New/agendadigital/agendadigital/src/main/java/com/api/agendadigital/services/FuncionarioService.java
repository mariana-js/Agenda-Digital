package com.api.agendadigital.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.agendadigital.model.Funcionario;
import com.api.agendadigital.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {
    FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    @Transactional
    public Funcionario save(Funcionario funcionario) {
        return funcionarioRepository.save(funcionario);
    }

    public List<Funcionario> findAll() {
        return funcionarioRepository.findAll();
    }

    public Optional<Funcionario> findById(UUID id_funcionario) {
        return funcionarioRepository.findById(id_funcionario);
    }

    public void delete(Funcionario funcionario) {
        funcionarioRepository.delete(funcionario);
    }

}
