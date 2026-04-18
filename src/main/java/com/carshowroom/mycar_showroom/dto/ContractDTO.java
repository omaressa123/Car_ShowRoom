package com.carshowroom.mycar_showroom.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public class ContractDTO {
    @NotNull(message = "Customer ID required")
    @Min(value = 1, message = "Customer ID must be positive")
    private Long customerId;

    @NotNull(message = "Car ID required")
    @Min(value = 1, message = "Car ID must be positive")
    private Long carId;

    @NotNull(message = "Start date required")
    private LocalDateTime startTime;

    @NotNull(message = "End date required")
    private LocalDateTime endTime;

    @Min(value = 1, message = "Duration must be at least 1 day")
    private Integer rentalDays;

    @NotBlank(message = "Payment method required")
    private String paymentMethod;

    // Constructors
    public ContractDTO() {}

    // Getters/Setters
    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }

    public Integer getRentalDays() { return rentalDays; }
    public void setRentalDays(Integer rentalDays) { this.rentalDays = rentalDays; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}

