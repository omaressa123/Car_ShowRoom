package com.carshowroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carshowroom.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    
}