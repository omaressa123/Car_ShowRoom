package com.carshowroom.mycar_showroom.dto;

import jakarta.validation.constraints.*;

public class PurchaseDTO {
    @NotNull(message = "Car ID required")
    @Min(value = 1, message = "Car ID must be positive")
    private Long carId;

    @NotBlank(message = "Customer name required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Customer name must not contain numbers or special characters")
    @Size(max = 100, message = "Name too long")
    private String customerName;

    @NotBlank(message = "Phone number required")
    @Pattern(regexp = "^[0-9]+$", message = "Phone number must contain only numbers")
    private String phone;

    @Email(message = "Invalid email")
    private String email;

    @NotBlank(message = "Payment method required")
    private String paymentMethod;
    
    @NotBlank(message = "SSN is required for contract")
    @Size(min = 5, max = 30, message = "SSN/ID must be between 5 and 30 characters")
    private String ssn;

    @NotBlank(message = "Photo of ID is required")
    private String idPhotoUrl;

    // Constructors
    public PurchaseDTO() {}

    // Getters/Setters
    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getSsn() { return ssn; }
    public void setSsn(String ssn) { this.ssn = ssn; }

    public String getIdPhotoUrl() { return idPhotoUrl; }
    public void setIdPhotoUrl(String idPhotoUrl) { this.idPhotoUrl = idPhotoUrl; }
}

