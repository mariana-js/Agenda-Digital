package br.com.AgendaDigital.projeto.services;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import br.com.AgendaDigital.projeto.model.Setor;
import br.com.AgendaDigital.projeto.repositories.SetorRepository;

@Service
public class SetorService {
    final SetorRepository setorRepository;
    
    public SetorService(SetorRepository setorRepository) {
        this.setorRepository = setorRepository;
    }

    @Transactional
    public Setor save(Setor setor) {
        return setorRepository.save(setor);
    }

}
