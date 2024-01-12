package com.api.agendadigital.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.agendadigital.model.Setor;
import com.api.agendadigital.repositories.SetorRepository;

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

    public List<Setor> findAll() {
        return setorRepository.findAll();
    }

    public Optional<Setor> findById(UUID id_setor) {
        return setorRepository.findById(id_setor);
    }

    public void delete(Setor setor) {
        setorRepository.delete(setor);
    }

}
