package br.com.AgendaDigital.projeto.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import br.com.AgendaDigital.projeto.model.Funcionario;
import br.com.AgendaDigital.projeto.repositories.FuncionarioRepository;

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

    public List<Funcionario> getFuncionariosPorMes(int mes) {
       return funcionarioRepository.findByMes(mes);
    }
}
