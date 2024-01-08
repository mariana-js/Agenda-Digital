package br.com.AgendaDigital.dtos;

import javax.validation.constraints.NotBlank;

public class SetorDtos {
	@NotBlank
	private String nome_setor;

    public String getNome_setor() {
        return nome_setor;
    }

    public void setNome_setor(String nome_setor) {
        this.nome_setor = nome_setor;
    }
}
