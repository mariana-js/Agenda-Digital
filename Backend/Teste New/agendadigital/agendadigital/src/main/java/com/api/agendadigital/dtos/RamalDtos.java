package com.api.agendadigital.dtos;

import jakarta.validation.constraints.NotBlank;

public class RamalDtos {
    @NotBlank
    private String numero_ramal;

    public String getNumero_ramal() {
        return numero_ramal;
    }

    public void setNumero_ramal(String numero_ramal) {
        this.numero_ramal = numero_ramal;
    }

}
