package br.com.AgendaDigital.projeto.model;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "setor_ramal")
public class Setor_Ramal {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_setor_ramal;

    @Column(name = "id_setor")
    private UUID id_setor;

    @Column(name = "id_ramal_setor")
    private String id_ramal_setor;

    public UUID getId_setor_ramal() {
        return id_setor_ramal;
    }

    public void setId_setor_ramal(UUID id_setor_ramal) {
        this.id_setor_ramal = id_setor_ramal;
    }

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

    public void setRegistrationDate(LocalDateTime now) {
 }

}
