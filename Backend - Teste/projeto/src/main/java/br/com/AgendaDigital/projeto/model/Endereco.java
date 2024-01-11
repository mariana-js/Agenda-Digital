package br.com.AgendaDigital.projeto.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "endereco")
public class Endereco implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id_endereco; // Agora o id é o mesmo que o id da Pessoa

	@Column(name = "id_pessoa", nullable = false)
	private UUID id_pessoa;

	@Column(name = "logradouro", length = 40, nullable = false)
	private String logradouro;

	@Column(name = "bairro", length = 40, nullable = false)
	private String bairro;

	@Column(name = "cidade", length = 20, nullable = false)
	private String cidade;

	@Column(name = "uf", length = 2, nullable = false)
	private String uf;

	@Column(name = "cep", length = 9, nullable = false)
	private String cep;

	@Column(name = "estado", length = 20, nullable = false)
	private String estado;

	// Getters and Setters

	public void setRegistrationDate(LocalDateTime now) {
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public UUID getId_pessoa() {
		return id_pessoa;
	}

	public void setId_pessoa(UUID id_pessoa) {
		this.id_pessoa = id_pessoa;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public UUID getId_endereco() {
		return id_endereco;
	}

	public void setId_endereco(UUID id_endereco) {
		this.id_endereco = id_endereco;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

}
