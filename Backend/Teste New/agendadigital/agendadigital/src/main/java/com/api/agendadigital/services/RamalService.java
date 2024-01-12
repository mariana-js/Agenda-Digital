package com.api.agendadigital.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.agendadigital.model.Ramal;
import com.api.agendadigital.repositories.RamalRepository;

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

    public List<Ramal> findAll() {
        return ramalRepository.findAll();
    }

    public Optional<Ramal> findById(String id_ramal) {
        return ramalRepository.findById(id_ramal);
    }

    public void delete(Ramal ramal) {
        ramalRepository.delete(ramal);
    }

}
