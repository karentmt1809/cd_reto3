package com.example.reto3k.reto3;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 *
 * @author karent_Saenz
 */
@Entity
@Table(name = "computer")
public class Computer implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**
     * Atributo para referirse al id del computador
     */
    private Integer id;
    /**
     * Atributo para referirse al nombre del computador
     */
    private String name;
    /**
     * Atributo para referirse a la marca del computador
     */
    private String brand;
    /**
     * Atributo para referirse al año de fabricacion del computador
     */
    private Integer year;
    /**
     * Atributo para referirse a la descripcion del computador
     */
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "categoryId")
    @JsonIgnoreProperties("computers")
    /**
     * Atributo para referirse a la clase categoria
     */
    private Categoria category;

    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "computer")
    @JsonIgnoreProperties({"computer", "client"})
    /**
     * Atributo para referirse una lista de tipo Mensaje
     */
    private List<Mensaje> messages;

    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "computer")
    @JsonIgnoreProperties({"computer", "client"})
    /**
     * Atributo para referirse a una lista de tipo Reservaciones
     */
    private List<Reservaciones> reservations;
    /**
     * Metodo get para el id
     */
    public Integer getId() {
        return id;
    }
    /**
     * Metodo set para el id
     */
    public void setId(Integer id) {
        this.id = id;
    }
    /**
     * Metodo get para el nombre
     */
    public String getName() {
        return name;
    }
    /**
     * Metodo set para el nombre 
     */
    public void setName(String name) {
        this.name = name;
    }
    /**
     * Metodo get para la marca
     */
    public String getBrand() {
        return brand;
    }
    /**
     * Metodo set para la marca
     */
    public void setBrand(String brand) {
        this.brand = brand;
    }
    /**
     * Metodo get para el año
     */
    public Integer getYear() {
        return year;
    }
    /**
     * Metodo set para el año
     */
    public void setYear(Integer year) {
        this.year = year;
    }
    /**
     * Metodo get para la descripcion
     */
    public String getDescription() {
        return description;
    }
    /**
     * Metodo set para la descripcion
     */
    public void setDescription(String description) {
        this.description = description;
    }
    /**
     * Metodo get para la categoria
     */
    public Categoria getCategory() {
        return category;
    }
    /**
     * Metodo set para la categoria
     */
    public void setCategory(Categoria category) {
        this.category = category;
    }
    /**
     * Metodo get para la lista tipo Mensaje
     */
    public List<Mensaje> getMessages() {
        return messages;
    }
    /**
     * Metodo set para la lista tipo Mensaje
     */
    public void setMessages(List<Mensaje> messages) {
        this.messages = messages;
    }
    /**
     * Metodo get para la lista tipo Reservaciones
     */
    public List<Reservaciones> getReservations() {
        return reservations;
    }
    /**
     * Metodo set para la lista tipo Reservaciones
     */
    public void setReservations(List<Reservaciones> reservations) {
        this.reservations = reservations;
    }

}