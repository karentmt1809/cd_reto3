package com.example.reto3k.reto3;

public class ContadorClientes {
    private Long total;
    private Client cliente;
    public ContadorClientes(Long total, Client cliente) {
        this.total = total;
        this.cliente = cliente;
    }
    public Long getTotal() {
        return total;
    }
    public void setTotal(Long total) {
        this.total = total;
    }
    public Client getCliente() {
        return cliente;
    }
    public void setCliente(Client cliente) {
        this.cliente = cliente;
    }
   
    
    
}
