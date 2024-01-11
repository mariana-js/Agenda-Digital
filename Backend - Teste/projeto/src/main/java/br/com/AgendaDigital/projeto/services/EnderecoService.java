package br.com.AgendaDigital.projeto.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import br.com.AgendaDigital.projeto.model.Endereco;
import br.com.AgendaDigital.projeto.repositories.EnderecoRepository;

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
