package br.com.AgendaDigital.projeto.model;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Repository;

@Entity
@Repository
@Table (name = "usuario")
public class Usuario implements Serializable{

	private static final long serialVersionUID = 1L; 
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	
	@Column(name = "nome", length = 10, nullable = true)
	private String nome;
	
	@Column(name = "senha",columnDefinition = "TEXT", nullable = true)
	private String senha;
	 
	
//Getters and setters	 
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
    public void setRegistrationDate(LocalDateTime now) {
    }
	
}