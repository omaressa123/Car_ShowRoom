package com.carshowroom.mycar_showroom.selenium;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CarShowroomUITests extends BaseSeleniumTest {

    @Test
    void testAllPagesLoadSuccessfully() {
        // Test Home
        navigateToHome();
        assertEquals("Car Showroom", driver.getTitle().trim());

        // Test Login
        driver.get(BASE_URL + "/login");
        assertTrue(driver.getPageSource().contains("Login"));

        // Test Register
        driver.get(BASE_URL + "/register");
        assertTrue(driver.getPageSource().contains("Register"));

        // Test Cars
        driver.get(BASE_URL + "/cars");
        assertTrue(driver.getPageSource().contains("cars"));

        // Test Search
        driver.get(BASE_URL + "/search");
        assertTrue(driver.getPageSource().contains("search"));

        // Test Rent
        driver.get(BASE_URL + "/rent");
        assertTrue(driver.getPageSource().contains("rent"));

        // Test Dashboard
        driver.get(BASE_URL + "/dashboard");
        assertTrue(driver.getPageSource().contains("dashboard"));
    }

    @Test
    void testRegistrationAndLoginFlow() {
        // 1. Register
        RegisterPage registerPage = new RegisterPage(driver);
        registerPage.navigate();
        
        String testUser = "testuser_" + System.currentTimeMillis();
        registerPage.register("Test", "User", "1234567890", testUser + "@example.com", testUser, "password123");
        
        // Should redirect to login
        assertTrue(driver.getCurrentUrl().contains("/login"), "Should redirect to login after registration");
        
        // 2. Login
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login(testUser, "password123");
        
        // Should redirect to cars page
        assertTrue(driver.getCurrentUrl().contains("/cars"), "Should redirect to cars page after login");
    }

    @Test
    void testAdminLoginFlow() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigate();
        loginPage.login("admin", "admin123");
        
        // Should redirect to dashboard
        assertTrue(driver.getCurrentUrl().contains("/dashboard"), "Admin should redirect to dashboard");
    }
}
