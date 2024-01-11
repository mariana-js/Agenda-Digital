package br.com.AgendaDigital.projeto.services;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
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

    // public boolean existsByCelular_corporativo(String celular_corporativo) {
    //     return pessoaRepository.existsByCelular_corporativo(celular_corporativo);
    // }

    // public boolean existsByCelular_pessoal(String celular_pessoal) {
    //     return pessoaRepository.existsByCelular_pessoal(celular_pessoal);
    // }

    // public boolean existsByTelefone(String telefone) {
    //     return pessoaRepository.existsByTelefone(telefone);
    // }

}
