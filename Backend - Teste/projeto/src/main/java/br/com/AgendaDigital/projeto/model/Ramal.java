package br.com.AgendaDigital.projeto.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table (name = "ramal")
public class Ramal implements Serializable{

	private static final long serialVersionUID = 1L; 

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID  id_ramal;
			
	@Column(name = "numero_ramal", length = 15, nullable = true)
	private String numero_ramal;

	
//Getters and Setters
	public UUID getId_ramal() {
		return id_ramal;
	}

	public void setId_ramal(UUID id_ramal) {
		this.id_ramal = id_ramal;
	}

	public String getNumero_ramal() {
		return numero_ramal;
	}

	public void setNumero_ramal(String numero_ramal) {
		this.numero_ramal = numero_ramal;
	}

    public void setRegistrationDate(LocalDateTime now) {
    }
	
}
