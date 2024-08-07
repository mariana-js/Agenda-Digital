package br.com.AgendaDigital.projeto.dtos;

import java.util.UUID;

import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EnderecoDtos {
    @JsonProperty("id_pessoa")
    private UUID id_pessoa;

    private String logradouro;

    private String numero;

    private String bairro;

    private String cidade;

    private String uf;

    @Size(max = 9)
    private String cep;

    @JsonProperty("estado")
    private String estado;

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public UUID getId_pessoa() {
        return id_pessoa;
    }

    public void setId_pessoa(UUID id_pessoa) {
        this.id_pessoa = id_pessoa;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

}
