package com.carshowroom.mycar_showroom.service;

import com.carshowroom.mycar_showroom.entity.Customer;
import com.carshowroom.mycar_showroom.entity.User;
import com.carshowroom.mycar_showroom.entity.Role;
import com.carshowroom.mycar_showroom.repository.CustomerRepository;
import com.carshowroom.mycar_showroom.repository.UserRepository;
import com.carshowroom.mycar_showroom.repository.RoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    public Role getRoleByName(String name) {
        Optional<Role> role = roleRepository.findByName(name);
        return role.orElse(null);
    }

    public boolean userExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    // Add more methods for business logic
}
