package br.com.AgendaDigital.projeto.services;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import br.com.AgendaDigital.projeto.model.Ramal;
import br.com.AgendaDigital.projeto.repositories.RamalRepository;

@Service
public class RamalService {
    final RamalRepository ramalRepository;

    public RamalService(RamalRepository ramalRepository) {
        this.ramalRepository = ramalRepository;
    }

    @Transactional
    public Ramal save(Ramal ramal) {
        return ramalRepository.save(ramal);
    }

}
