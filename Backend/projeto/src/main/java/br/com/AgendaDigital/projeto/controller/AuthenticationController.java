package br.com.AgendaDigital.projeto.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.AgendaDigital.projeto.dtos.AuthenticationDtos;
import br.com.AgendaDigital.projeto.dtos.LoginResponseDtos;
import br.com.AgendaDigital.projeto.dtos.RegisterDtos;
import br.com.AgendaDigital.projeto.repositories.UserRepository;
import br.com.AgendaDigital.projeto.services.TokenService;
import br.com.AgendaDigital.projeto.model.User;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  TokenService tokenService;

  @SuppressWarnings("rawtypes")
  @PostMapping("/login")
  public ResponseEntity login(@RequestBody @Valid AuthenticationDtos data) {
    var usernamePassword = new UsernamePasswordAuthenticationToken(data.usuario(), data.senha());
    var auth = this.authenticationManager.authenticate(usernamePassword);

    var token = tokenService.generateToken((User) auth.getPrincipal());

    return ResponseEntity.ok(new LoginResponseDtos(token));
  }

  @PostMapping("/register")
  public ResponseEntity register(@RequestBody @Valid RegisterDtos data) {

    if (this.userRepository.findByUsuario(data.usuario()) != null)
      return ResponseEntity.badRequest().build();
    String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
    User newUser = new User(data.usuario(), encryptedPassword, data.role());

    this.userRepository.save(newUser);
    return ResponseEntity.ok().build();

  }

}
