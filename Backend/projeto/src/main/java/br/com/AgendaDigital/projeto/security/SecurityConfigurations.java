package br.com.AgendaDigital.projeto.security;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    SecurityFilter securityFilter;

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
                        .antMatchers(HttpMethod.POST, "/auth/login", "/auth/register").permitAll()
                                                
                        .antMatchers(HttpMethod.GET, "/pessoa", "/setor", "/setor_ramal", "/ramal", "/funcionario/all", "/endereco").permitAll()
                        .antMatchers(HttpMethod.GET, "/usuario").hasRole("ADMIN")

                        .antMatchers(HttpMethod.POST, "/pessoa", "/setor", "/setor_ramal", "/ramal", "/funcionario/all",
                                "/endereco").hasRole("ADMIN")
                        .antMatchers(HttpMethod.POST, "/usuario").permitAll()
                        .antMatchers(HttpMethod.PUT, "/pessoa", "/setor", "/setor_ramal", "/ramal", "/funcionario/all","/endereco", "/usuario").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/pessoa", "/setor", "/setor_ramal", "/ramal", "/funcionario/all","/endereco", "/usuario").hasRole("ADMIN")

                        .anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
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
