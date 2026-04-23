package com.carshowroom.mycar_showroom.controller;

import com.carshowroom.mycar_showroom.dto.ResponseWrapper;
import com.carshowroom.mycar_showroom.repository.BranchRepository;
import com.carshowroom.mycar_showroom.repository.CarRepository;
import com.carshowroom.mycar_showroom.repository.ColorRepository;
import com.carshowroom.mycar_showroom.repository.CompanyRepository;
import com.carshowroom.mycar_showroom.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/options")
public class OptionsController {

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping
    public ResponseEntity<ResponseWrapper<Map<String, Object>>> getDynamicOptions() {
        // Branches
        List<Map<String, Object>> branches = branchRepository.findAllByOrderByNameAsc().stream().map(b -> {
            Map<String, Object> dto = new HashMap<>();
            dto.put("id", b.getId());
            dto.put("name", b.getName());
            dto.put("city", b.getCity());
            return dto;
        }).collect(Collectors.toList());

        // Companies from dedicated table (falls back to distinct brands on cars)
        List<Map<String, Object>> companies = companyRepository.findAllByOrderByNameAsc().stream().map(c -> {
            Map<String, Object> dto = new HashMap<>();
            dto.put("id", c.getId());
            dto.put("name", c.getName());
            return dto;
        }).collect(Collectors.toList());

        // Colors from dedicated table
        List<Map<String, Object>> colors = colorRepository.findAllByOrderByNameAsc().stream().map(c -> {
            Map<String, Object> dto = new HashMap<>();
            dto.put("id", c.getId());
            dto.put("name", c.getName());
            return dto;
        }).collect(Collectors.toList());

        // Payment methods
        List<String> paymentMethods = paymentRepository.findDistinctPaymentMethods();
        if (paymentMethods.isEmpty()) {
            paymentMethods = List.of("credit_card", "bank_transfer", "crypto");
        }

        Map<String, Object> data = new HashMap<>();
        data.put("branches", branches);
        data.put("companies", companies);
        data.put("colors", colors);
        data.put("paymentMethods", paymentMethods);

        return ResponseEntity.ok(ResponseWrapper.success("Dynamic options loaded", data));
    }
}
