package com.carshowroom.mycar_showroom.repository;

import com.carshowroom.mycar_showroom.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByBranch(Long branchId);
    Optional<Employee> findByPhone(String phone);
}
