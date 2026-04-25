package com.carshowroom.mycar_showroom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carshowroom.mycar_showroom.dto.ResponseWrapper;
import com.carshowroom.mycar_showroom.service.ContractService;

@RestController
@RequestMapping("/api/admin/contracts")
public class AdminContractsController {

    @Autowired
    private ContractService contractService;

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseWrapper<Object>> pendingContracts() {
        return ResponseEntity.ok(ResponseWrapper.success("Pending contracts retrieved", contractService.getPendingPurchaseContracts()));
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseWrapper<Void>> approve(@PathVariable Long id) {
        try {
            contractService.approvePurchaseContract(id);
            return ResponseEntity.ok(ResponseWrapper.success("Contract approved"));
        } catch (Exception e) {
            return ResponseEntity.ok(ResponseWrapper.error(e.getMessage()));
        }
    }

    @PostMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseWrapper<Void>> reject(@PathVariable Long id) {
        try {
            contractService.rejectPurchaseContract(id);
            return ResponseEntity.ok(ResponseWrapper.success("Contract rejected"));
        } catch (Exception e) {
            return ResponseEntity.ok(ResponseWrapper.error(e.getMessage()));
        }
    }
}

