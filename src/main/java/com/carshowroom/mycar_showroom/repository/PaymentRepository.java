package com.carshowroom.mycar_showroom.repository;

import com.carshowroom.mycar_showroom.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByContractId(Long contractId);
}
