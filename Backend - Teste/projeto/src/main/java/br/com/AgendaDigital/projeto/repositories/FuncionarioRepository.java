package br.com.AgendaDigital.projeto.repositories;

import br.com.AgendaDigital.projeto.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, UUID> {


    // boolean existsByEmail(String email);

    // boolean existsByCelular_corporativo(String celular_corporativo);

    // boolean existsByCelular_pessoal(String celular_pessoal);

    // boolean existsByTelefone(String telefone);

}
