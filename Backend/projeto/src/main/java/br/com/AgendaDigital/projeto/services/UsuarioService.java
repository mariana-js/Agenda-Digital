package br.com.AgendaDigital.projeto.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import br.com.AgendaDigital.projeto.model.User;
import br.com.AgendaDigital.projeto.repositories.UserRepository;

@Service
public class UsuarioService {
    final UserRepository usuarioRepository;

    public UsuarioService(UserRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public User save(User usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<User> findAll() {
        return usuarioRepository.findAll();
    }

    public Optional<User> findById(UUID id) {
        return usuarioRepository.findById(id);
    }

    public void delete(User usuario) {
        usuarioRepository.delete(usuario);
    }

    public Optional<User> findByUsuario(String usuario) {
        return usuarioRepository.findByUsuario(usuario);
    }

}
