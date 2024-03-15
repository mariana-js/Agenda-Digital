package br.com.AgendaDigital.projeto.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "funcionario")
public class Funcionario implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id_funcionario;

	@Column(name = "id_pessoa")
	private UUID id_pessoa;

	@Column(name = "id_setor_ramal")
	private UUID id_setor_ramal;

	@Column(name = "data_nascimento", nullable = true)
	private LocalDate data_nascimento;
	
	// Getters and setters
	public UUID getId_setor_ramal() {
		return id_setor_ramal;
	}

	public void setId_setor_ramal(UUID id_setor_ramal) {
		this.id_setor_ramal = id_setor_ramal;
	}
	
	public void setRegistrationDate(LocalDateTime now) {
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public UUID getId_funcionario() {
		return id_funcionario;
	}

	public void setId_funcionario(UUID id_funcionario) {
		this.id_funcionario = id_funcionario;
	}

	public UUID getId_pessoa() {
		return id_pessoa;
	}

	public void setId_pessoa(UUID id_pessoa) {
		this.id_pessoa = id_pessoa;
	}

	public LocalDate getData_nascimento() {
		return data_nascimento;
	}

	public void setData_nascimento(LocalDate data_nascimento) {
		this.data_nascimento = data_nascimento;
	}
}
