package com.carshowroom.mycar_showroom.repository;

import com.carshowroom.mycar_showroom.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    @Query("SELECT c FROM Car c WHERE c.status = 'AVAILABLE'")
    List<Car> findAvailableCars();
    
    List<Car> findByBrand(String brand);
    
    List<Car> findByModel(String model);
}
