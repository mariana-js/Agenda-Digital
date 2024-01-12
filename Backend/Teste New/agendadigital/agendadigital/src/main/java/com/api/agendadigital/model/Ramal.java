package com.api.agendadigital.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "ramal")
public class Ramal implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private String numero_ramal;

	// Getters and Setters

	public String getNumero_ramal() {
		return numero_ramal;
	}

	public void setNumero_ramal(String numero_ramal) {
		this.numero_ramal = numero_ramal;
	}

	public void setRegistrationDate(LocalDateTime now) {
	}

}
