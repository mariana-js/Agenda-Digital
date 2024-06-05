package br.com.AgendaDigital.projeto.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.AgendaDigital.projeto.model.Usuario;

public class UserDetailsImpl implements UserDetails{

    private UUID id;

    private String name;

    private String username;

    private String password;

    public static UserDetailsImpl build(Usuario usuario){
        return new UserDetailsImpl(
            usuario.getId_usuario(),
            usuario.getNome(),
            usuario.getUsuario(),
            new ArrayList<>());
    }
    

    public UserDetailsImpl(UUID id, String name, String username, 
        Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.authorities = authorities;
    }


    private Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return authorities;

    }

    @Override
    public String getPassword() {
       return password;
    }

    @Override
    public String getUsername() {
       return username;
    }

    @Override
    public boolean isAccountNonExpired() {
       return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
    
}
