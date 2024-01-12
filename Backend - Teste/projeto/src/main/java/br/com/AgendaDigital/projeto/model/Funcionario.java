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

	@Column(name = "id_setor")
	private UUID id_setor;

	@Column(name = "numero_ramal")
	private String numero_ramal;

	@Column(name = "data_nascimento", nullable = true)
	private LocalDate data_nascimento;

	@Column(name = "flag_administrador", nullable = true)
	private Boolean flag_administrador;

	// Mês Aniversariantes

	// Getters and setters

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

	public UUID getId_setor() {
		return id_setor;
	}

	public void setId_setor(UUID id_setor) {
		this.id_setor = id_setor;
	}

	public String getNumero_ramal() {
		return numero_ramal;
	}

	public void setNumero_ramal(String numero_ramal) {
		this.numero_ramal = numero_ramal;
	}

	public Boolean getFlag_administrador() {
		return flag_administrador;
	}

	public void setFlag_administrador(Boolean flag_administrador) {
		this.flag_administrador = flag_administrador;
	}

	public LocalDate getData_nascimento() {
		return data_nascimento;
	}

	public void setData_nascimento(LocalDate data_nascimento) {
		this.data_nascimento = data_nascimento;
	}

	// @Column(name = "img", nullable = true)
	// private byte[] img;

	// String dataNascimentoString = data_nascimento;
	// LocalDate dataNascimento = LocalDate.parse(dataNascimentoString);
	// public LocalDate getDataNascimentoAsLocalDate(){
	// if (data_nascimento == null){
	// return null;
	// }
	// return LocalDate.parse(data_nascimento);
	// }

	// public void setDataNascimento(String data_nascimento){
	// this.data_nascimento = data_nascimento;
	// }

	// public byte[] getImg() {
	// return img;
	// }

	// public void setImg(byte[] img) {
	// this.img = img;
	// }
	// public String getData_nascimento() {
	// return data_nascimento;
	// }

	// public void setData_nascimento(String data_nascimento) {
	// this.data_nascimento = data_nascimento;
	// }
}
