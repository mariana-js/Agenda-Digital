package br.com.AgendaDigital.projeto.infra.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {
    /**
     * @param httpSecurity
     * @return
     * @throws Exception
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize

                        .antMatchers(HttpMethod.GET, "/auth/login").permitAll()
                        .antMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .antMatchers(HttpMethod.POST, "/auth/register").permitAll()

                        .antMatchers(HttpMethod.GET, "/pessoa").permitAll()
                        .antMatchers(HttpMethod.GET, "/setor").permitAll()
                        .antMatchers(HttpMethod.GET, "/setor_ramal").permitAll()
                        .antMatchers(HttpMethod.GET, "/ramal").permitAll()
                        .antMatchers(HttpMethod.GET, "/funcionario").permitAll()
                        .antMatchers(HttpMethod.GET, "/endereco").permitAll()
                        .antMatchers(HttpMethod.GET, "/usuario").hasRole("ADMIN")

                        .antMatchers(HttpMethod.POST, "/pessoa").hasRole("ADMIN")
                        .antMatchers(HttpMethod.POST, "/setor").hasRole("ADMIN")
                        .antMatchers(HttpMethod.POST, "/setor_ramal").hasRole("ADMIN")
                        .antMatchers(HttpMethod.POST, "/ramal").hasRole("ADMIN")
                        .antMatchers(HttpMethod.POST, "/funcionario").hasRole("ADMIN")
                        .antMatchers(HttpMethod.POST, "/endereco").hasRole("ADMIN")
                        .antMatchers(HttpMethod.POST, "/usuario").hasRole("ADMIN")

                        .antMatchers(HttpMethod.PUT, "/pessoa").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PUT, "/setor").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PUT, "/setor_ramal").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PUT, "/ramal").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PUT, "/funcionario").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PUT, "/endereco").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PUT, "/usuario").hasRole("ADMIN")

                        .antMatchers(HttpMethod.DELETE, "/pessoa").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/setor").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/setor_ramal").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/ramal").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/funcionario").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/endereco").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/usuario").hasRole("ADMIN"))
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
