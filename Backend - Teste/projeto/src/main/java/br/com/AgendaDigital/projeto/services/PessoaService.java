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

}
