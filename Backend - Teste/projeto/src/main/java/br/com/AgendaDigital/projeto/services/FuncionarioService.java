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

    // public boolean existsByEmail(String email) {
    // return funcionarioRepository.existsByEmail(email);
    // }

    // public boolean existsByCelular_corporativo(String celular_corporativo) {
    // return
    // funcionarioRepository.existsByCelular_corporativo(celular_corporativo);
    // }

    // public boolean existsByCelular_pessoal(String celular_pessoal) {
    // return funcionarioRepository.existsByCelular_pessoal(celular_pessoal);
    // }

    // public boolean existsByTelefone(String telefone) {
    // return funcionarioRepository.existsByTelefone(telefone);
    // }

}
