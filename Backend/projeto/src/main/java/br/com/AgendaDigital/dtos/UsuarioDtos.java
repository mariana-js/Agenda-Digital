package br.com.AgendaDigital.dtos;

import java.util.UUID;

import javax.validation.constraints.NotBlank;

public class UsuarioDtos {

    private UUID id;

    @NotBlank
    private String usuario;

    @NotBlank
    private String nome;

    @NotBlank
    private String senha;

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

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
