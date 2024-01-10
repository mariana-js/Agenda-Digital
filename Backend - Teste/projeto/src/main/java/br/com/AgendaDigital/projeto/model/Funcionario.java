package br.com.AgendaDigital.projeto.model;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDateTime;
import javax.persistence.*;
import java.util.UUID;

@Entity
@Table (name = "funcionario")
public class Funcionario implements Serializable{
	private static final long serialVersionUID = 1L; 

	@Id
	private UUID id_pessoa;

	@Column(name = "id_setor")
	private Integer id_setor;

	@Column(name = "img")
	private Byte img;

	@Column(name = "data_nascimento", nullable = true)
	private Date data_nascimento;
	
	@Column(name = "flag_administrador", nullable = true)
	private Boolean flag_administrador;	

// Mês Aniversariantes



//Getters and setters
	public UUID getId_pessoa() {
		return id_pessoa;
	}

	public void setId_pessoa(UUID id_pessoa) {
		this.id_pessoa = id_pessoa;
	}

	public Integer getId_setor() {
		return id_setor;
	}

	public void setId_setor(Integer id_setor) {
		this.id_setor = id_setor;
	}

	public Byte getImg() {
		return img;
	}

	public void setImg(Byte img) {
		this.img = img;
	}

	public Date getData_nascimento() {
		return data_nascimento;
	}

	public void setData_nascimento(Date data_nascimento) {
		this.data_nascimento = data_nascimento;
	}

	public Boolean getFlag_administrador() {
		return flag_administrador;
	}

	public void setFlag_administrador(Boolean flag_administrador) {
		this.flag_administrador = flag_administrador;
	}

    public void setRegistrationDate(LocalDateTime now) {
    }


}
