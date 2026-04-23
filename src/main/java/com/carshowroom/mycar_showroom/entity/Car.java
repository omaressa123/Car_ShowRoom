package com.carshowroom.mycar_showroom.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;

@Entity
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String plateNumber;

    /** Legacy plain-text brand kept for backward-compat; prefer company relationship */
    private String brand;

    private String model;
    private Integer year;
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private CarStatus status = CarStatus.AVAILABLE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    /** FK to companies table — the canonical company reference */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id")
    private Company company;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contract> contracts = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "car_images", joinColumns = @JoinColumn(name = "car_id"))
    @Column(name = "image_url", nullable = false)
    private List<String> imageUrls = new ArrayList<>();

    /** Many-to-many join to the colors table */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "car_color_link",
        joinColumns = @JoinColumn(name = "car_id"),
        inverseJoinColumns = @JoinColumn(name = "color_id")
    )
    private List<Color> colorEntities = new ArrayList<>();

    @Column(nullable = false)
    private Integer quantityAvailable = 0;

    // Constructors
    public Car() {}

    public Car(String plateNumber, String brand, String model, Integer year, BigDecimal price, Branch branch) {
        this.plateNumber = plateNumber;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.branch = branch;
    }

    // --- Getters / Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPlateNumber() { return plateNumber; }
    public void setPlateNumber(String plateNumber) { this.plateNumber = plateNumber; }

    /** Returns the display brand: company name when set, otherwise legacy brand string. */
    public String getBrand() {
        if (company != null) return company.getName();
        return brand;
    }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public CarStatus getStatus() { return status; }
    public void setStatus(CarStatus status) { this.status = status; }

    public Branch getBranch() { return branch; }
    public void setBranch(Branch branch) { this.branch = branch; }

    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }

    public List<Contract> getContracts() { return contracts; }
    public void setContracts(List<Contract> contracts) { this.contracts = contracts; }

    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }

    public List<Color> getColorEntities() { return colorEntities; }
    public void setColorEntities(List<Color> colorEntities) { this.colorEntities = colorEntities; }

    /** Convenience: returns just the color names as strings */
    public List<String> getColors() {
        List<String> names = new ArrayList<>();
        for (Color c : colorEntities) names.add(c.getName());
        return names;
    }

    public Integer getQuantityAvailable() { return quantityAvailable; }
    public void setQuantityAvailable(Integer quantityAvailable) { this.quantityAvailable = quantityAvailable; }

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", plateNumber='" + plateNumber + '\'' +
                ", brand='" + getBrand() + '\'' +
                ", model='" + model + '\'' +
                ", year=" + year +
                ", status=" + status +
                ", branchId=" + (branch != null ? branch.getId() : null) +
                '}';
    }
}
