package com.carshowroom.mycar_showroom.repository;

import com.carshowroom.mycar_showroom.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    @Query("SELECT c FROM Car c WHERE c.status = 'AVAILABLE' AND c.quantityAvailable > 0")
    List<Car> findAvailableCars();

    @Query("SELECT c.branch.name, COALESCE(SUM(c.quantityAvailable), 0) FROM Car c GROUP BY c.branch.name ORDER BY c.branch.name")
    List<Object[]> sumAvailableUnitsByBranch();

    @Query("SELECT COALESCE(SUM(c.quantityAvailable), 0) FROM Car c WHERE c.status = 'AVAILABLE'")
    long sumAvailableUnits();

    /** Returns distinct company names — prefers the company entity, falls back to legacy brand string */
    @Query("SELECT DISTINCT COALESCE(c.company.name, c.brand) FROM Car c " +
           "WHERE COALESCE(c.company.name, c.brand) IS NOT NULL AND COALESCE(c.company.name, c.brand) <> '' " +
           "ORDER BY COALESCE(c.company.name, c.brand)")
    List<String> findDistinctBrands();

    List<Car> findByBrand(String brand);

    List<Car> findByModel(String model);
}
