package com.carshowroom.mycar_showroom.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carshowroom.mycar_showroom.dto.CarDTO;
import com.carshowroom.mycar_showroom.entity.Branch;
import com.carshowroom.mycar_showroom.entity.Car;
import com.carshowroom.mycar_showroom.entity.CarStatus;
import com.carshowroom.mycar_showroom.entity.Color;
import com.carshowroom.mycar_showroom.entity.Company;
import com.carshowroom.mycar_showroom.repository.BranchRepository;
import com.carshowroom.mycar_showroom.repository.CarRepository;
import com.carshowroom.mycar_showroom.repository.ColorRepository;
import com.carshowroom.mycar_showroom.repository.CompanyRepository;

import jakarta.transaction.Transactional;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private AuditService auditService;

    @Transactional
    public List<Map<String, Object>> searchCars(String company, String model, String color, String branch) {
        List<Car> cars = carRepository.findAvailableCars();

        List<Car> filtered = cars.stream().filter(car -> {
            boolean matches = true;
            // Filter by company name (check both legacy brand and new company entity)
            if (company != null && !company.isBlank()) {
                String brandName = car.getBrand(); // getBrand() resolves company entity if set
                if (brandName == null || !brandName.equalsIgnoreCase(company)) {
                    matches = false;
                }
            }
            if (model != null && !model.isBlank() && !car.getModel().equalsIgnoreCase(model)) {
                matches = false;
            }
            // Filter by color name
            if (color != null && !color.isBlank()) {
                boolean hasColor = car.getColors().stream()
                        .anyMatch(c -> c.equalsIgnoreCase(color));
                if (!hasColor) matches = false;
            }
            if (branch != null && !branch.isBlank() &&
                    (car.getBranch() == null || !car.getBranch().getName().equalsIgnoreCase(branch))) {
                matches = false;
            }
            return matches;
        }).collect(Collectors.toList());

        return filtered.stream().map(this::toMap).collect(Collectors.toList());
    }

    @Transactional
    public List<Car> getAvailableCars() {
        return carRepository.findAvailableCars();
    }

    @Transactional
    public Car getCarById(Long id) {
        return carRepository.findById(id).orElse(null);
    }

    @Transactional
    public Map<String, Object> getCarDetails(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));
        return toMap(car);
    }

    @Transactional
    public void addCar(CarDTO dto) {
        Branch branch = branchRepository.findById(dto.getBranchId())
                .orElseThrow(() -> new IllegalArgumentException("Branch not found"));

        Company company = companyRepository.findById(dto.getCompanyId())
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));

        // Resolve color entities
        List<Color> colors = new ArrayList<>();
        if (dto.getColorIds() != null) {
            for (Long colorId : dto.getColorIds()) {
                Color c = colorRepository.findById(colorId)
                        .orElseThrow(() -> new IllegalArgumentException("Color ID not found: " + colorId));
                colors.add(c);
            }
        }

        // Clean image URLs
        List<String> cleanImageUrls = dto.getImageUrls() == null ? new ArrayList<>() :
                dto.getImageUrls().stream()
                        .filter(url -> url != null && !url.isBlank())
                        .map(String::trim)
                        .collect(Collectors.toList());

        Car car = new Car();
        car.setCompany(company);
        car.setBrand(company.getName()); // also keep legacy field in sync
        car.setModel(dto.getModel());
        car.setYear(dto.getYear());
        car.setPrice(dto.getPrice());
        car.setColorEntities(colors);
        car.setImageUrls(cleanImageUrls);

        int qty = dto.getQuantityAvailable() == null ? 0 : Math.max(0, dto.getQuantityAvailable());
        car.setQuantityAvailable(qty);
        car.setBranch(branch);
        car.setStatus(qty > 0 ? CarStatus.AVAILABLE : CarStatus.UNAVAILABLE);
        carRepository.save(car);

        auditService.log("CREATE_CAR", "Car created: " + company.getName() + " " + dto.getModel());
    }

    @Transactional
    public void updateCarPrice(Long id, BigDecimal newPrice) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));
        car.setPrice(newPrice);
        carRepository.save(car);
        auditService.log("UPDATE_PRICE", "Car ID " + id + " price updated to " + newPrice);
    }

    @Transactional
    public void deleteCar(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));
        carRepository.delete(car);
        auditService.log("DELETE_CAR", "Car ID " + id + " deleted");
    }

    public void updateCarStatus(Long carId, String status) {
        Car car = carRepository.findById(carId).orElse(null);
        if (car != null) {
            try {
                car.setStatus(CarStatus.valueOf(status));
                carRepository.save(car);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid car status: " + status);
            }
        }
    }

    // --- Private helpers ---

    private Map<String, Object> toMap(Car car) {
        Map<String, Object> dto = new HashMap<>();
        dto.put("id", car.getId());
        dto.put("brand", car.getBrand()); // resolves company name automatically
        dto.put("companyId", car.getCompany() != null ? car.getCompany().getId() : null);
        dto.put("model", car.getModel());
        dto.put("year", car.getYear());
        dto.put("price", car.getPrice());
        dto.put("status", car.getStatus());
        dto.put("branchId", car.getBranch() != null ? car.getBranch().getId() : null);
        dto.put("branchName", car.getBranch() != null ? car.getBranch().getName() : "N/A");
        dto.put("imageUrls", car.getImageUrls());
        dto.put("colors", car.getColors());          // list of color name strings
        dto.put("colorEntities", car.getColorEntities().stream()
                .map(c -> Map.of("id", c.getId(), "name", c.getName()))
                .collect(Collectors.toList()));
        dto.put("quantityAvailable", car.getQuantityAvailable());
        return dto;
    }
}
