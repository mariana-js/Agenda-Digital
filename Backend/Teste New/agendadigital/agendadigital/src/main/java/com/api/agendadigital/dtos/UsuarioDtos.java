package com.api.agendadigital.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;

public class UsuarioDtos {

    private UUID id;

    @NotBlank
    private String nome;

    @NotBlank
    private String senha;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

}
