package com.carshowroom.mycar_showroom.controller;

import com.carshowroom.mycar_showroom.dto.ResponseWrapper;
import com.carshowroom.mycar_showroom.entity.Company;
import com.carshowroom.mycar_showroom.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    @GetMapping
    public ResponseEntity<ResponseWrapper<List<Map<String, Object>>>> getAll() {
        List<Map<String, Object>> companies = companyRepository.findAllByOrderByNameAsc()
                .stream()
                .map(c -> Map.<String, Object>of("id", c.getId(), "name", c.getName()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(ResponseWrapper.success("Companies retrieved", companies));
    }

    @PostMapping
    public ResponseEntity<ResponseWrapper<Map<String, Object>>> addCompany(@RequestBody Map<String, String> body) {
        String name = body.getOrDefault("name", "").trim();
        if (name.isBlank()) {
            return ResponseEntity.badRequest().body(ResponseWrapper.error("Company name cannot be empty"));
        }
        if (companyRepository.existsByNameIgnoreCase(name)) {
            return ResponseEntity.badRequest().body(ResponseWrapper.error("Company '" + name + "' already exists"));
        }
        Company saved = companyRepository.save(new Company(name));
        return ResponseEntity.ok(ResponseWrapper.success("Company added", Map.of("id", saved.getId(), "name", saved.getName())));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Void>> deleteCompany(@PathVariable Long id) {
        if (!companyRepository.existsById(id)) {
            return ResponseEntity.badRequest().body(ResponseWrapper.error("Company not found"));
        }
        companyRepository.deleteById(id);
        return ResponseEntity.ok(ResponseWrapper.success("Company deleted"));
    }
}
