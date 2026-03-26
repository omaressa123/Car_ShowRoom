package com.carshowroom.service;

import java.util.List;

import com.carshowroom.entity.Customer;

public interface CustomerService {

    List<Customer> getAllCustomers();
    
    Customer saveCustomer(Customer customer);
}