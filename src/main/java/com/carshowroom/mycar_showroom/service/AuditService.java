package com.carshowroom.mycar_showroom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carshowroom.mycar_showroom.entity.AuditLog;
import com.carshowroom.mycar_showroom.repository.AuditLogRepository;

@Service
public class AuditService {
    @Autowired
    private AuditLogRepository auditLogRepository;

    public void log(String action, String details) {
        String actor = getCurrentUser();
        AuditLog log = new AuditLog(actor, action, details);
        auditLogRepository.save(log);
    }

    private String getCurrentUser() {
        String username = SecurityContextHolder.getInstance().getCurrentUsername();
        return username != null ? username : "system";
    }
}