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
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id_pessoa;

	@Column(name = "id_setor")
	private Integer id_setor;

	@Column(name = "id_endereco")
	private Integer id_endereco;	

	@Column(name = "nome_pessoa", length = 50, nullable = true)
	private String nome_pessoa;
	
	@Column(name = "email", length = 50, nullable = true)
	private String email;
	
	@Column(name = "celular_corporativo", length = 15, nullable = true)
	private String celular_corporativo;
	
	@Column(name = "celular_pessoal", length = 15, nullable = false)
	private String celular_pessoal;
	
	@Column(name = "telefone", length = 15, nullable = false)
	private String telefone;
	
	@Column(name = "flag_privado", nullable = true)
	private Boolean flag_privado;
	
	@Column(name = "flag_funcionario", nullable = true)
	private Boolean flag_funcionario;

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

	public Integer getId_endereco() {
		return id_endereco;
	}

	public void setId_endereco(Integer id_endereco) {
		this.id_endereco = id_endereco;
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

	public String getCelular_corporativo() {
		return celular_corporativo;
	}

	public void setCelular_corporativo(String celular_corporativo) {
		this.celular_corporativo = celular_corporativo;
	}

	public String getCelular_pessoal() {
		return celular_pessoal;
	}

	public void setCelular_pessoal(String celular_pessoal) {
		this.celular_pessoal = celular_pessoal;
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
