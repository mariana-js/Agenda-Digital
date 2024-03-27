package br.com.AgendaDigital.dtos;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PessoaDtos {

    @NotBlank
    
    @JsonProperty("nome_pessoa")
    private String nome_pessoa;

    @NotBlank
    private String email;

    @JsonProperty("celular1")
    private String celular1;

    @JsonProperty("celular2")
    private String celular2;

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

    public String getCelular1() {
        return celular1;
    }

    public void setCelular1(String celular1) {
        this.celular1 = celular1;
    }

    public String getCelular2() {
        return celular2;
    }

    public void setCelular2(String celular2) {
        this.celular2 = celular2;
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
