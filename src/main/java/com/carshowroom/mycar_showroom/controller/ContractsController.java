package com.carshowroom.mycar_showroom.controller;

import com.carshowroom.mycar_showroom.dto.ContractDTO;
import com.carshowroom.mycar_showroom.dto.ResponseWrapper;
import com.carshowroom.mycar_showroom.service.ContractService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContractsController {

    @Autowired
    private ContractService contractService;

    @PostMapping("/contracts")
    public ResponseEntity<ResponseWrapper<Void>> createContract(@Valid @RequestBody ContractDTO request) {
        try {
            contractService.createRentalContract(request);
            return ResponseEntity.ok(ResponseWrapper.success("Contract created successfully"));
        } catch (Exception e) {
            return ResponseEntity.ok(ResponseWrapper.error(e.getMessage()));
        }
    }
}


