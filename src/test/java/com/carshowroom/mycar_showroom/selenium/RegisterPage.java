package com.carshowroom.mycar_showroom.selenium;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class RegisterPage {

    private final WebDriver driver;

    @FindBy(id = "fname")
    private WebElement firstNameField;

    @FindBy(id = "lname")
    private WebElement lastNameField;

    @FindBy(id = "phone")
    private WebElement phoneField;

    @FindBy(id = "email")
    private WebElement emailField;

    @FindBy(id = "username")
    private WebElement usernameField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(css = "button[type='submit']")
    private WebElement registerButton;

    public RegisterPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public void register(String firstName, String lastName, String phone, String email, String username, String password) {
        firstNameField.sendKeys(firstName);
        lastNameField.sendKeys(lastName);
        phoneField.sendKeys(phone);
        emailField.sendKeys(email);
        usernameField.sendKeys(username);
        passwordField.sendKeys(password);
        registerButton.click();
    }

    public void navigate() {
        driver.get(BaseSeleniumTest.BASE_URL + "/register");
    }
}
