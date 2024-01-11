package br.com.AgendaDigital.projeto.services;

import javax.transaction.Transactional;
import java.util.List;
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

}
