package com.example.reto3k.reto3;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 * @author karent_saenz
 */
public interface InterfaceReservaciones extends CrudRepository<Reservaciones,Integer>{
    public List<Reservaciones> findAllByStatus (String status); 
    
    public List<Reservaciones> findAllByStartDateAfterAndStartDateBefore(Date dateOne, Date dateTwo);
    
    // SELECT clientid, COUNT(*) AS total FROM reservaciones group by clientid order by desc;
    @Query ("SELECT c.client, COUNT(c.client) from Reservaciones AS c group by c.client order by COUNT(c.client)DESC")
    public List<Object[]> countTotalReservationsByClient();
    
}