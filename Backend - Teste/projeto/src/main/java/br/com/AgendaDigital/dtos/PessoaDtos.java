package br.com.AgendaDigital.dtos;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class PessoaDtos {

    @NotBlank
    private String nome_pessoa;
    @NotBlank
    private String email;
    @Size(max = 15)
    private String celular_corporativo;
    @Size(max = 15)
    private String celular_pessoal;
    @Size(max = 15)
    private String telefone;
    @NotBlank
    private Boolean flag_privado;
    @NotBlank
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
