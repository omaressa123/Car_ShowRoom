package com.carshowroom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.carshowroom.entity.Car;
import com.carshowroom.repository.CarRepository;

@Controller
public class CarController {

    @Autowired
    private CarRepository repo;

    @GetMapping("/cars")
    public String getCars(Model model) {
        List<Car> cars = repo.findAll();
        model.addAttribute("cars", cars); 
        return "cars"; 
}
}