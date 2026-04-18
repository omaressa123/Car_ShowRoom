package com.carshowroom.mycar_showroom.dto;

public class DashboardStatsDTO {
    private int totalCars;
    private int availableCars;
    private int rentedCars;
    private double totalRevenue;
    private int pendingContracts;
    private int recentBookings;

    // Constructors
    public DashboardStatsDTO() {}

    public DashboardStatsDTO(int totalCars, int availableCars, int rentedCars, double totalRevenue, 
                           int pendingContracts, int recentBookings) {
        this.totalCars = totalCars;
        this.availableCars = availableCars;
        this.rentedCars = rentedCars;
        this.totalRevenue = totalRevenue;
        this.pendingContracts = pendingContracts;
        this.recentBookings = recentBookings;
    }

    // Getters/Setters
    public int getTotalCars() { return totalCars; }
    public void setTotalCars(int totalCars) { this.totalCars = totalCars; }

    public int getAvailableCars() { return availableCars; }
    public void setAvailableCars(int availableCars) { this.availableCars = availableCars; }

    public int getRentedCars() { return rentedCars; }
    public void setRentedCars(int rentedCars) { this.rentedCars = rentedCars; }

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }

    public int getPendingContracts() { return pendingContracts; }
    public void setPendingContracts(int pendingContracts) { this.pendingContracts = pendingContracts; }

    public int getRecentBookings() { return recentBookings; }
    public void setRecentBookings(int recentBookings) { this.recentBookings = recentBookings; }
}

