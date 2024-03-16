package br.com.AgendaDigital.dtos;

import java.util.UUID;

import javax.validation.constraints.NotBlank;

public class UsuarioDtos {

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
