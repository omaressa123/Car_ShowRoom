package com.carshowroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carshowroom.entity.City;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {

}