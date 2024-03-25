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
@Table(name = "pessoa")
public class Pessoa implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id_pessoa;

	@Column(name = "nome_pessoa", length = 50, nullable = true)
	private String nome_pessoa;

	@Column(name = "email", length = 50, nullable = true)
	private String email;

	@Column(name = "celular1", length = 15, nullable = true)
	private String celular1;

	@Column(name = "celular2", length = 15, nullable = false)
	private String celular2;

	@Column(name = "telefone", length = 15, nullable = false)
	private String telefone;

	@Column(name = "flag_privado", nullable = false)
	private Boolean flag_privado;

	@Column(name = "flag_funcionario", nullable = false)
	private Boolean flag_funcionario;

	// Getters and setters
	public UUID getId_pessoa() {
		return id_pessoa;
	}

	public void setId_pessoa(UUID id_pessoa) {
		this.id_pessoa = id_pessoa;
	}

	public String getNome_pessoa() {
		return nome_pessoa;
	}

	public void setNome_pessoa(String nome_pessoa) {
		this.nome_pessoa = nome_pessoa;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCelular1() {
		return celular1;
	}

	public void setCelular1(String celular1) {
		this.celular1 = celular1;
	}

	public String getCelular2() {
		return celular2;
	}

	public void setCelular2(String celular2) {
		this.celular2 = celular2;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public Boolean getFlag_privado() {
		return flag_privado;
	}

	public void setFlag_privado(Boolean flag_privado) {
		this.flag_privado = flag_privado;
	}

	public Boolean getFlag_funcionario() {
		return flag_funcionario;
	}

	public void setFlag_funcionario(Boolean flag_funcionario) {
		this.flag_funcionario = flag_funcionario;
	}

	public void setRegistrationDate(LocalDateTime now) {
	}

}
