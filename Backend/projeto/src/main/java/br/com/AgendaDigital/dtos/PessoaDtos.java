package br.com.AgendaDigital.dtos;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PessoaDtos {

    @NotBlank
    private String nome_pessoa;

    @NotBlank
    private String email;

    @JsonProperty("celular_corporativo")
    private String celular_corporativo;

    @JsonProperty("celular_pessoal")
    private String celular_pessoal;

    @JsonProperty("telefone")
    private String telefone;

    @JsonProperty("flag_privado")
    private Boolean flag_privado;

    @JsonProperty("flag_funcionario")
    private Boolean flag_funcionario;

    public String getNome_pessoa() {
        return nome_pessoa;
    }

    public void setNome_pessoa(String nome_pessoa) {
        this.nome_pessoa = nome_pessoa;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCelular_corporativo() {
        return celular_corporativo;
    }

    public void setCelular_corporativo(String celular_corporativo) {
        this.celular_corporativo = celular_corporativo;
    }

    public String getCelular_pessoal() {
        return celular_pessoal;
    }

    public void setCelular_pessoal(String celular_pessoal) {
        this.celular_pessoal = celular_pessoal;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Boolean getFlag_privado() {
        return flag_privado;
    }

    public void setFlag_privado(Boolean flag_privado) {
        this.flag_privado = flag_privado;
    }

    public Boolean getFlag_funcionario() {
        return flag_funcionario;
    }

    public void setFlag_funcionario(Boolean flag_funcionario) {
        this.flag_funcionario = flag_funcionario;
    }
    


}