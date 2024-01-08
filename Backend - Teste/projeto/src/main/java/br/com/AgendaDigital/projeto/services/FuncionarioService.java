package br.com.AgendaDigital.projeto.services;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import br.com.AgendaDigital.projeto.model.Funcionario;
import br.com.AgendaDigital.projeto.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {
    FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    @Transactional
    public Funcionario save(Funcionario funcionario) {
        return funcionarioRepository.save(funcionario);
    }


}
