/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.AgendaDigital.projeto.model;

/**
 *
 * @author mariana
 */
public enum UserRole {
    ADMIN("admin");
    
    private String role;
    
    
    UserRole(String role){
        this.role = role;
    }
    
    public String getRole(){
        return role;
    }
    
}
