package com.carshowroom.mycar_showroom.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "contracts")
public class Contract {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private Car car;

    private String paymentMethod;
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    private ContractStatus status = ContractStatus.PENDING;

    // Constructors
    public Contract() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public Car getCar() { return car; }
    public void setCar(Car car) { this.car = car; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

    public ContractStatus getStatus() { return status; }
    public void setStatus(ContractStatus status) { this.status = status; }

    @Override
    public String toString() {
        return "Contract{" +
                "id=" + id +
                ", customerId=" + (customer != null ? customer.getId() : null) +
                ", carId=" + (car != null ? car.getId() : null) +
                ", totalPrice=" + totalPrice +
                ", status=" + status +
                '}';
    }
}
