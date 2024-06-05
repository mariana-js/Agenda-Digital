package br.com.AgendaDigital.projeto.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import br.com.AgendaDigital.projeto.model.Usuario;
import br.com.AgendaDigital.projeto.repositories.UsuarioRepository;

public class UserDetailServiceImpl implements UserDetailsService{

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      Usuario usuario = usuarioRepository.findByLogin(username).get();
        return UserDetailsImpl.build(usuario);
    }

}
