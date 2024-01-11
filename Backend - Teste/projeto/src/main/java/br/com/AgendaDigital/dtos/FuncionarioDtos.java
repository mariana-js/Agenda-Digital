package br.com.AgendaDigital.dtos;

import java.time.LocalDate;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

public class FuncionarioDtos {
    @JsonProperty("id_pessoa")
    private UUID id_pessoa;

    @JsonProperty("id_setor")
    private UUID id_setor;

    @JsonProperty("numero_ramal")
    private String numero_ramal;

    @JsonProperty("flag_administrador")
    private Boolean flag_administrador;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate data_nascimento;

    public UUID getId_pessoa() {
        return id_pessoa;
    }

    public void setId_pessoa(UUID id_pessoa) {
        this.id_pessoa = id_pessoa;
    }

    public UUID getId_setor() {
        return id_setor;
    }

    public void setId_setor(UUID id_setor) {
        this.id_setor = id_setor;
    }

    public Boolean getFlag_administrador() {
        return flag_administrador;
    }

    public void setFlag_administrador(Boolean flag_administrador) {
        this.flag_administrador = flag_administrador;
    }

    public String getNumero_ramal() {
        return numero_ramal;
    }

    public void setNumero_ramal(String numero_ramal) {
        this.numero_ramal = numero_ramal;
    }

    public LocalDate getData_nascimento() {
        return data_nascimento;
    }

    public void setData_nascimento(LocalDate data_nascimento) {
        this.data_nascimento = data_nascimento;
    }

}
