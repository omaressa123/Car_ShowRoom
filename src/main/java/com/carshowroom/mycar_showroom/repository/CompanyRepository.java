package com.carshowroom.mycar_showroom.repository;

import com.carshowroom.mycar_showroom.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    List<Company> findAllByOrderByNameAsc();
    boolean existsByNameIgnoreCase(String name);
    Optional<Company> findByNameIgnoreCase(String name);
}
