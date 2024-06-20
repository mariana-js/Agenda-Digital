package br.com.AgendaDigital.projeto.infra.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import br.com.AgendaDigital.projeto.model.User;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(User user){

        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                .withIssuer("auth-api")
                .withSubject(user.getUsuario())
                .withExpiresAt(1000)
                .sign(algorithm);

        } catch (Exception e) {
           
        }
    }
    private Instant genExiprationDate(){
        return LocalDateTime.now().plusHours(1).toInstant(ZoneOffset.of("-3"));
    }
}
