package com.carshowroom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carshowroom.entity.Gender;
import com.carshowroom.repository.GenderRepository;

@Service
public class GenderService {

    @Autowired
    private GenderRepository genderRepository;

    public List<Gender> getAllGenders() {
        return genderRepository.findAll();
    }
}