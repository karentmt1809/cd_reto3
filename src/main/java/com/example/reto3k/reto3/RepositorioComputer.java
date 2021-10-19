package com.example.reto3k.reto3;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author karent_saenz
 */
@Repository
public class RepositorioComputer {
    
    @Autowired
    private InterfaceComputer crud;

    public List<Computer> getAll(){
        return (List<Computer>) crud.findAll();
    }

    public Optional<Computer> getComputer(int id){
        return crud.findById(id);
    }

    public Computer save(Computer computer) {
        return crud.save(computer);
    }
    public void delete(Computer computer){
        crud.delete(computer);
    }
    
}
