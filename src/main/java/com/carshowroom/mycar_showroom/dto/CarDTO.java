package com.carshowroom.mycar_showroom.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CarDTO {

    @NotNull(message = "Company ID is required")
    @Min(value = 1, message = "Company ID must be positive")
    private Long companyId;

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

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity must be >= 0")
    private Integer quantityAvailable;

    /** IDs from the colors table */
    private List<Long> colorIds = new ArrayList<>();

    private List<@NotBlank(message = "Image URL cannot be empty") String> imageUrls = new ArrayList<>();

    // Constructors
    public CarDTO() {}

    // Getters/Setters
    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public Long getBranchId() { return branchId; }
    public void setBranchId(Long branchId) { this.branchId = branchId; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getQuantityAvailable() { return quantityAvailable; }
    public void setQuantityAvailable(Integer quantityAvailable) { this.quantityAvailable = quantityAvailable; }

    public List<Long> getColorIds() { return colorIds; }
    public void setColorIds(List<Long> colorIds) { this.colorIds = colorIds; }

    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }

    // ---- Backward-compat helpers used by legacy code paths ----
    /** @deprecated Use companyId instead */
    @Deprecated
    public String getBrand() { return null; }

    /** @deprecated Use colorIds instead */
    @Deprecated
    public List<String> getColors() { return new ArrayList<>(); }
}
