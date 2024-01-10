package br.com.AgendaDigital.dtos;


import com.fasterxml.jackson.annotation.JsonProperty;

public class FuncionarioDtos {

    @JsonProperty("flag_administrador")
    private Boolean flag_administrador;


    public Boolean getFlag_administrador() {
        return flag_administrador;
    }

    public void setFlag_administrador(Boolean flag_administrador) {
        this.flag_administrador = flag_administrador;
    }

}
