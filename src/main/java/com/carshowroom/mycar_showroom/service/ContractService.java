package com.carshowroom.mycar_showroom.service;

import com.carshowroom.mycar_showroom.entity.Contract;
import com.carshowroom.mycar_showroom.entity.Car;
import com.carshowroom.mycar_showroom.entity.Customer;
import com.carshowroom.mycar_showroom.entity.Employee;
import com.carshowroom.mycar_showroom.entity.CarStatus;
import com.carshowroom.mycar_showroom.entity.ContractStatus;
import com.carshowroom.mycar_showroom.entity.Payment;
import com.carshowroom.mycar_showroom.repository.ContractRepository;
import com.carshowroom.mycar_showroom.repository.CarRepository;
import com.carshowroom.mycar_showroom.repository.CustomerRepository;
import com.carshowroom.mycar_showroom.repository.EmployeeRepository;
import com.carshowroom.mycar_showroom.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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
    private EmployeeRepository employeeRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public void createRentalContract(ContractRequest request) throws Exception {
        // Validate inputs
        if (request.getCustomerId() == null || request.getCarId() == null) {
            throw new IllegalArgumentException("Customer ID and Car ID are required");
        }

        // Check car availability
        Optional<Car> carOpt = carRepository.findById(request.getCarId());
        if (!carOpt.isPresent()) {
            throw new Exception("Car not found");
        }

        Car car = carOpt.get();
        if (car.getStatus() != CarStatus.AVAILABLE) {
            throw new Exception("Car is not available for rental");
        }

        // Get customer
        Optional<Customer> customerOpt = customerRepository.findById(request.getCustomerId());
        if (!customerOpt.isPresent()) {
            throw new Exception("Customer not found");
        }

        // Get employee if provided
        Employee employee = null;
        if (request.getEmployeeId() != null) {
            Optional<Employee> empOpt = employeeRepository.findById(request.getEmployeeId());
            if (empOpt.isPresent()) {
                employee = empOpt.get();
            }
        }

        // Calculate rental cost
        long days = ChronoUnit.DAYS.between(request.getStartTime(), request.getEndTime());
        if (days <= 0) {
            throw new IllegalArgumentException("End time must be after start time");
        }
        BigDecimal totalPrice = car.getPricePerDay().multiply(BigDecimal.valueOf(days));

        // Create contract
        Contract contract = new Contract();
        contract.setCustomer(customerOpt.get());
        contract.setCar(car);
        contract.setEmployee(employee);
        contract.setStartTime(request.getStartTime());
        contract.setEndTime(request.getEndTime());
        contract.setTotalPrice(totalPrice);
        contract.setStatus(ContractStatus.PENDING);

        contractRepository.save(contract);

        // Update car status
        car.setStatus(CarStatus.BOOKED);
        carRepository.save(car);

        // Create payment record if payment method provided
        if (request.getPaymentMethod() != null) {
            Payment payment = new Payment();
            payment.setContract(contract);
            payment.setAmount(totalPrice.doubleValue());
            payment.setPaymentMethod(request.getPaymentMethod());
            payment.setStatus("PENDING");
            paymentRepository.save(payment);
        }
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
