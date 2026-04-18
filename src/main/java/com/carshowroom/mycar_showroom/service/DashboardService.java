package com.carshowroom.mycar_showroom.service;

import com.carshowroom.mycar_showroom.dto.DashboardStatsDTO;
import com.carshowroom.mycar_showroom.repository.CarRepository;
import com.carshowroom.mycar_showroom.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Service
public class DashboardService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private ContractRepository contractRepository;

    public DashboardStatsDTO getDashboardStats() {
        long totalCars = carRepository.count();
        long availableCars = carRepository.findAvailableCars().size();
        long rentedCars = totalCars - availableCars;
        
        java.math.BigDecimal totalRevenue = contractRepository.sumTotalRevenue();
        if (totalRevenue == null) totalRevenue = java.math.BigDecimal.ZERO;
        
        long pendingContracts = contractRepository.countPendingContracts();
        
        java.time.LocalDateTime lastWeek = java.time.LocalDateTime.now().minusDays(7);
        long recentBookings = contractRepository.countRecentBookings(lastWeek);

        return new DashboardStatsDTO((int) totalCars, (int) availableCars, (int) rentedCars, 
                                   totalRevenue.doubleValue(), (int) pendingContracts, (int) recentBookings);
    }
}

