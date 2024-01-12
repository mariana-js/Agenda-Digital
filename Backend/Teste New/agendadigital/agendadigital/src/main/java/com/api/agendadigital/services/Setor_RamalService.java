package com.api.agendadigital.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.agendadigital.model.Setor_Ramal;
import com.api.agendadigital.repositories.Setor_RamalRepository;

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

    public List<Setor_Ramal> findAll() {
        return setor_RamalRepository.findAll();
    }

    public Optional<Setor_Ramal> findById(UUID id_setor_ramal) {
        return setor_RamalRepository.findById(id_setor_ramal);
    }

    public void delete(Setor_Ramal setor_Ramal) {
        setor_RamalRepository.delete(setor_Ramal);
    }
}
