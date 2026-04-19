package com.carshowroom.mycar_showroom.controller;

import com.carshowroom.mycar_showroom.dto.PurchaseDTO;
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

@PostMapping("/purchases")
    public ResponseEntity<ResponseWrapper<Void>> createPurchase(@Valid @RequestBody PurchaseDTO request) {
        try {
            contractService.createPurchase(request);
            return ResponseEntity.ok(ResponseWrapper.success("Purchase created successfully. Invoice generated."));
        } catch (Exception e) {
            return ResponseEntity.ok(ResponseWrapper.error(e.getMessage()));
        }
    }
}


