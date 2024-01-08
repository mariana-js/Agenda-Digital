package br.com.AgendaDigital.projeto.services;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import br.com.AgendaDigital.projeto.model.Endereco;
import br.com.AgendaDigital.projeto.repositories.EnderecoRepository;

@Service
public class EnderecoService {
    final EnderecoRepository enderecoRepository;

    public EnderecoService(EnderecoRepository enderecoRepository){
        this.enderecoRepository = enderecoRepository;
    }

    @Transactional
    public Endereco save(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }


}
