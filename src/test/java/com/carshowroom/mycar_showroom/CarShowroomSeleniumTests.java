package com.carshowroom.mycar_showroom;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CarShowroomSeleniumTests {

    @LocalServerPort
    private int port;

    private WebDriver driver;

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", () -> "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1");
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create-drop");
    }

    @BeforeEach
    void setUp() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless"); // Run without UI
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        driver = new ChromeDriver(options);
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    void testHomePageLoads() {
        driver.get("http://localhost:" + port + "/");
        assertTrue(driver.getTitle().contains("Car Showroom"));
    }

    @Test
    void testCarsPageLoads() {
        driver.get("http://localhost:" + port + "/cars");
        assertTrue(driver.getPageSource().contains("cars.html") || driver.getTitle().contains("Cars"));
    }

    @Test
    void testSearchPageLoads() {
        driver.get("http://localhost:" + port + "/search");
        assertTrue(driver.getPageSource().contains("search"));
    }

    @Test
    void testRentPageLoads() {
        driver.get("http://localhost:" + port + "/rent");
        assertTrue(driver.getPageSource().contains("rent"));
    }

    @Test
    void testDashboardPageLoads() {
        driver.get("http://localhost:" + port + "/dashboard");
        assertTrue(driver.getPageSource().contains("dashboard"));
    }

    @Test
    void testNavigationNavbar() {
        driver.get("http://localhost:" + port + "/");
        // Test navbar links exist
        assertTrue(driver.getPageSource().contains("Car Showroom"));
        assertTrue(driver.getPageSource().contains("Login") || driver.getPageSource().contains("Register"));
    }
}
