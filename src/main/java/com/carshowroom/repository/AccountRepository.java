package com.carshowroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carshowroom.entity.Accounts;

@Repository
public interface AccountRepository extends JpaRepository<Accounts, Integer> {

    Accounts findByUsername(String username);
    
}