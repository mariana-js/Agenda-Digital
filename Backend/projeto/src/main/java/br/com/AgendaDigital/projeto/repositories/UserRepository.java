package br.com.AgendaDigital.projeto.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.AgendaDigital.projeto.model.User;

public interface UserRepository extends JpaRepository<User, UUID>{
   UserDetails findByUsuario(String usuario);

}
