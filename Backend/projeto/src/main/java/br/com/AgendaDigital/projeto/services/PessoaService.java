package br.com.AgendaDigital.projeto.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import br.com.AgendaDigital.projeto.model.Funcionario;
import br.com.AgendaDigital.projeto.model.Pessoa;
import br.com.AgendaDigital.projeto.repositories.PessoaRepository;

@Service
public class PessoaService {
    final PessoaRepository pessoaRepository;

    public PessoaService(PessoaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    @Transactional
    public Pessoa save(Pessoa pessoa) {
        return pessoaRepository.save(pessoa);
    }

    public boolean existsByEmail(String email) {
        return pessoaRepository.existsByEmail(email);
    }

    public List<Pessoa> findAll() {
        return pessoaRepository.findAll();
    }

    public Optional<Pessoa> findById(UUID id_pessoa) {
        return pessoaRepository.findById(id_pessoa);
    }

    public void delete(Pessoa pessoa) {
        pessoaRepository.delete(pessoa);
    }


    // public List<Pessoa> findByNome(String nome_pessoa) {
    //     return pessoaRepository.findByNome(nome_pessoa);
    // }

    // public boolean existsByCelular_corporativo(String celular_corporativo) {a
    // return pessoaRepository.existsByCelular_corporativo(celular_corporativo);
    // }

    // public boolean existsByCelular_pessoal(String celular_pessoal) {
    // return pessoaRepository.existsByCelular_pessoal(celular_pessoal);
    // }

    // public boolean existsByTelefone(String telefone) {
    // return pessoaRepository.existsByTelefone(telefone);
    // }

}
