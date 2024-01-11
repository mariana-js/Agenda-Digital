package br.com.AgendaDigital.dtos;

import java.util.UUID;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Setor_RamalDtos {

    @JsonProperty("id_setor")
    private UUID id_setor;

    @NotBlank
    private String id_ramal_setor;

    public UUID getId_setor() {
        return id_setor;
    }
    public void setId_setor(UUID id_setor) {
        this.id_setor = id_setor;
    }
    public String getId_ramal_setor() {
        return id_ramal_setor;
    }
    public void setId_ramal_setor(String id_ramal_setor) {
        this.id_ramal_setor = id_ramal_setor;
    }

    
}
