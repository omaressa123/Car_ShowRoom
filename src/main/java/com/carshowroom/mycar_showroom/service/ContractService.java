package com.carshowroom.mycar_showroom.service;

import com.carshowroom.mycar_showroom.entity.Contract;
import com.carshowroom.mycar_showroom.entity.Car;
import com.carshowroom.mycar_showroom.entity.Customer;
import com.carshowroom.mycar_showroom.entity.CarStatus;
import com.carshowroom.mycar_showroom.entity.ContractStatus;
import com.carshowroom.mycar_showroom.entity.Payment;
import com.carshowroom.mycar_showroom.repository.ContractRepository;
import com.carshowroom.mycar_showroom.repository.CarRepository;
import com.carshowroom.mycar_showroom.repository.CustomerRepository;
import com.carshowroom.mycar_showroom.dto.ContractDTO;
import com.carshowroom.mycar_showroom.entity.User;
import com.carshowroom.mycar_showroom.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditService auditService;

    @Transactional
    public void createRentalContract(ContractDTO dto) {
        // Get current authenticated user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
        
        Customer customer = user.getCustomer();
        if (customer == null) {
            throw new IllegalArgumentException("Authenticated user has no associated customer record");
        }

        // Check car availability
        Car car = carRepository.findById(dto.getCarId()).orElseThrow(() -> new IllegalArgumentException("Car not found"));
        if (car.getStatus() != CarStatus.AVAILABLE) {
            throw new IllegalArgumentException("Car is not available for rental");
        }

        // Calculate rental cost
        long days = dto.getRentalDays();
        BigDecimal totalPrice = car.getPricePerDay().multiply(BigDecimal.valueOf(days));

        // Create contract
        Contract contract = new Contract();
        contract.setCustomer(customer);
        contract.setCar(car);
        contract.setStartTime(LocalDateTime.now());
        contract.setEndTime(LocalDateTime.now().plusDays(days));
        contract.setTotalPrice(totalPrice);
        contract.setStatus(ContractStatus.PENDING);
        contractRepository.save(contract);

        // Update car status
        car.setStatus(CarStatus.BOOKED);
        carRepository.save(car);

        auditService.log("CREATE_CONTRACT", "Contract created for car " + dto.getCarId() + " by customer " + customer.getId());
    }


    public List<Contract> getContractsByCustomer(Long customerId) {
        return contractRepository.findByCustomerId(customerId);
    }

    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    public void cancelContract(Long contractId) throws Exception {
        Optional<Contract> contractOpt = contractRepository.findById(contractId);
        if (!contractOpt.isPresent()) {
            throw new Exception("Contract not found");
        }

        Contract contract = contractOpt.get();
        if (contract.getStatus() == ContractStatus.CANCELLED || contract.getStatus() == ContractStatus.COMPLETED) {
            throw new Exception("Cannot cancel a " + contract.getStatus() + " contract");
        }

        contract.setStatus(ContractStatus.CANCELLED);
        contractRepository.save(contract);

        // Release car back to available status
        Car car = contract.getCar();
        car.setStatus(CarStatus.AVAILABLE);
        carRepository.save(car);
    }
}
