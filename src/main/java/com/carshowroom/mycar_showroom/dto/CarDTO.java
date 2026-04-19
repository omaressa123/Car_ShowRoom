package com.carshowroom.mycar_showroom.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class CarDTO {
    @NotNull(message = "Plate number is required")
    @Size(min = 3, max = 10, message = "Plate number must be 3-10 chars")
    private String plateNumber;

    @NotBlank(message = "Brand is required")
    @Size(max = 50, message = "Brand too long")
    private String brand;

    @NotBlank(message = "Model is required")
    @Size(max = 50, message = "Model too long")
    private String model;

    @NotNull(message = "Year is required")
    @Min(value = 1900, message = "Year must be after 1900")
    @Max(value = 2027, message = "Year cannot be in future")
    private Integer year;

    @NotNull(message = "Branch ID is required")
    @Min(value = 1, message = "Branch ID must be positive")
    private Long branchId;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be positive")
    private BigDecimal price;

    // Constructors
    public CarDTO() {}

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    // Getters/Setters
    public String getPlateNumber() { return plateNumber; }
    public void setPlateNumber(String plateNumber) { this.plateNumber = plateNumber; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }


    public Long getBranchId() { return branchId; }
    public void setBranchId(Long branchId) { this.branchId = branchId; }
}

