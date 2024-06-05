package br.com.AgendaDigital.projeto.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import br.com.AgendaDigital.dtos.AcessDtos;
import br.com.AgendaDigital.dtos.AuthenticationDtos;
import br.com.AgendaDigital.security.jwt.JwtUtils;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public AcessDtos login(AuthenticationDtos authdtos) {
        try {
            // Cria mecanismo de credencial para o spring
            UsernamePasswordAuthenticationToken userAuth = new UsernamePasswordAuthenticationToken(authdtos.getUser(),
                    authdtos.getPassword());

            // Prepara mecanismo para autenticação
            Authentication authentication = authenticationManager.authenticate(userAuth);

            // Busca usuario logado
            UserDetailsImpl userAuthenticate = (UserDetailsImpl)authentication.getPrincipal();

            String token =  jwtUtils.generateTokenFromtUserDetailsImpl(userAuthenticate);
            AcessDtos acessDtos = new AcessDtos(token);
            return acessDtos;
        

        }catch(BadCredentialsException e){
        // TODO LOGIN OU SENHA INVALIDO
        return null;
    }

}}
