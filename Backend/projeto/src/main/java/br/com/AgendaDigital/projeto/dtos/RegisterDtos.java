package br.com.AgendaDigital.projeto.dtos;

import br.com.AgendaDigital.projeto.model.UserRole;

public record RegisterDtos(String usuario, String senha, UserRole role) {
    
}
