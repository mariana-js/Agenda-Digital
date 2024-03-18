package br.com.AgendaDigital.dtos;

import java.time.LocalDate;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

public class FuncionarioDtos {
    @JsonProperty("id_pessoa")
    private UUID id_pessoa;

    @JsonProperty("id_setor_ramal")
    private UUID id_setor_ramal;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate data_nascimento;

    public UUID getId_pessoa() {
        return id_pessoa;
    }

    public void setId_pessoa(UUID id_pessoa) {
        this.id_pessoa = id_pessoa;
    }

    public UUID getId_setor_ramal() {
        return id_setor_ramal;
    }

    public void setId_setor_ramal(UUID id_setor_ramal) {
        this.id_setor_ramal = id_setor_ramal;
    }

    public LocalDate getData_nascimento() {
        return data_nascimento;
    }

    public void setData_nascimento(LocalDate data_nascimento) {
        this.data_nascimento = data_nascimento;
    }

}
