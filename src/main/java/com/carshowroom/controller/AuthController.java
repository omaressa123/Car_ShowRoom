package com.carshowroom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.carshowroom.entity.Accounts;
import com.carshowroom.entity.Customer;
import com.carshowroom.service.AccountService;
import com.carshowroom.service.CityService;
import com.carshowroom.service.CustomerService;
import com.carshowroom.service.GenderService;

@Controller
public class AuthController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CityService cityService;

    @Autowired
    private GenderService genderService;

    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        Accounts account = new Accounts();
        account.setCustomer(new Customer());

        model.addAttribute("account", account);
        model.addAttribute("cities", cityService.getAllCities());
        model.addAttribute("genders", genderService.getAllGenders());
        return "register";
    }

    @PostMapping("/register")
    public String registerAccount(@ModelAttribute Accounts account, Model model) {
        customerService.saveCustomer(account.getCustomer());
        accountService.saveAccount(account);
        model.addAttribute("success", "Registration successful! You can now login.");
        return "login";
    }
}