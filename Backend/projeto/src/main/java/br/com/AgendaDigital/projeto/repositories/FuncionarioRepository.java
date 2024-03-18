package br.com.AgendaDigital.projeto.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.AgendaDigital.projeto.model.Funcionario;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, UUID> {

    @Query("SELECT f FROM Funcionario f WHERE EXTRACT(MONTH FROM f.data_nascimento) =  :mes")
    List<Funcionario> findByMes(@Param("mes") int mes);
}
