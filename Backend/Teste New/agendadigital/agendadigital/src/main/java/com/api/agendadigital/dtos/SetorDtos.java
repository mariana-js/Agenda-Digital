package com.api.agendadigital.dtos;

import jakarta.validation.constraints.NotBlank;

public class SetorDtos {
    @NotBlank
    private String nome_setor;

    @NotBlank
    private String sigla_setor;

    public String getSigla_setor() {
        return sigla_setor;
    }

    public void setSigla_setor(String sigla_setor) {
        this.sigla_setor = sigla_setor;
    }

    public String getNome_setor() {
        return nome_setor;
    }

    public void setNome_setor(String nome_setor) {
        this.nome_setor = nome_setor;
    }
}
