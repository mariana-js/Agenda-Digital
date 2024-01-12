package br.com.AgendaDigital.projeto.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import br.com.AgendaDigital.projeto.model.Usuario;
import br.com.AgendaDigital.projeto.repositories.UsuarioRepository;

@Service
public class UsuarioService {
    final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findById(UUID id) {
        return usuarioRepository.findById(id);
    }

    public void delete(Usuario usuario) {
        usuarioRepository.delete(usuario);
    }

}
