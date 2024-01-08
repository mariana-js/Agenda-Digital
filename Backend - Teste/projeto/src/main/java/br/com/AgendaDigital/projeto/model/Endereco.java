package br.com.AgendaDigital.projeto.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.*;
import java.util.UUID;

@Entity
@Table (name = "endereco")
public class Endereco implements Serializable{
	
	private static final long serialVersionUID = 1L; 

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id_endereco;	

	@Column(name = "rua", length = 40, nullable = false)
	private String rua;
	
	@Column(name = "numero_casa", length = 6, nullable = false)
	private String numero_casa;
	
	@Column(name = "bairro", length = 40, nullable = false)
	private String bairro;
	
	@Column(name = "cidade", length = 20, nullable = false)
	private String cidade;
	
	
	@Column(name = "uf", length = 2, nullable = false)
	private String uf;

	@Column(name = "cep", length = 9, nullable = false)
	private String cep;
	
//Getters and Setters
	public UUID getId_endereco() {
		return id_endereco;
	}

	public void setId_endereco(UUID id_endereco) {
		this.id_endereco = id_endereco;
	}

	public String getRua() {
		return rua;
	}

	public void setRua(String rua) {
		this.rua = rua;
	}

	public String getNumero_casa() {
		return numero_casa;
	}

	public void setNumero_casa(String numero_casa) {
		this.numero_casa = numero_casa;
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

	public void setRegistrationDate(LocalDateTime now) {
	}
	
}
