package br.com.AgendaDigital.projeto.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "setor")
public class Setor implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id_setor;

	@Column(name = "nome_setor", length = 20, nullable = true)
	private String nome_setor;

	@Column(name = "sigla_setor")
	private String sigla_setor;

	// Getters and setters
	public UUID getId_setor() {
		return id_setor;
	}

	public void setId_setor(UUID id_setor) {
		this.id_setor = id_setor;
	}

	public String getNome_setor() {
		return nome_setor;
	}

	public void setNome_setor(String nome_setor) {
		this.nome_setor = nome_setor;
	}

	public void setRegistrationDate(LocalDateTime now) {
	}

	public String getSigla_setor() {
		return sigla_setor;
	}

	public void setSigla_setor(String sigla_setor) {
		this.sigla_setor = sigla_setor;
	}
}
