package br.com.AgendaDigital.projeto.services;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import br.com.AgendaDigital.projeto.model.Setor_Ramal;
import br.com.AgendaDigital.projeto.repositories.Setor_RamalRepository;

@Service
public class Setor_RamalService {

    final Setor_RamalRepository setor_RamalRepository;
    
    public Setor_RamalService(Setor_RamalRepository setor_RamalRepository) {
        this.setor_RamalRepository = setor_RamalRepository;
    }

    @Transactional
    public Setor_Ramal save(Setor_Ramal setor_Ramal) {
        return setor_RamalRepository.save(setor_Ramal);
    }
}
