package com.carshowroom.mycar_showroom.service;

import com.carshowroom.mycar_showroom.entity.Car;
import com.carshowroom.mycar_showroom.entity.Branch;
import com.carshowroom.mycar_showroom.repository.CarRepository;
import com.carshowroom.mycar_showroom.repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private BranchRepository branchRepository;

    public List<Map<String, Object>> searchCars(String company, String model, String color, String branch) {
        // Get all available cars first
        List<Car> cars = carRepository.findAvailableCars();
        
        // Apply filters
        List<Car> filtered = cars.stream().filter(car -> {
            boolean matches = true;
            if (company != null && !car.getBrand().equalsIgnoreCase(company)) {
                matches = false;
            }
            if (model != null && !car.getModel().equalsIgnoreCase(model)) {
                matches = false;
            }
            if (branch != null && (car.getBranch() == null || !car.getBranch().getName().equalsIgnoreCase(branch))) {
                matches = false;
            }
            return matches;
        }).collect(Collectors.toList());
        
        // Convert to DTOs
        return filtered.stream().map(car -> {
            Map<String, Object> dto = new HashMap<>();
            dto.put("id", car.getId());
            dto.put("brand", car.getBrand());
            dto.put("model", car.getModel());
            dto.put("year", car.getYear());
            dto.put("price", car.getPricePerDay());
            dto.put("status", car.getStatus());
            dto.put("branchId", car.getBranch() != null ? car.getBranch().getId() : null);
            dto.put("branchName", car.getBranch() != null ? car.getBranch().getName() : "N/A");
            return dto;
        }).collect(Collectors.toList());
    }

    public List<Car> getAvailableCars() {
        return carRepository.findAvailableCars();
    }

    public Car getCarById(Long id) {
        return carRepository.findById(id).orElse(null);
    }

    public void updateCarStatus(Long carId, String status) {
        Car car = carRepository.findById(carId).orElse(null);
        if (car != null) {
            // Parse status string to enum
            try {
                car.setStatus(com.carshowroom.mycar_showroom.entity.CarStatus.valueOf(status));
                carRepository.save(car);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid car status: " + status);
            }
        }
    }
}
