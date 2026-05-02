# Car Showroom & Rental Management System

A comprehensive web-based application for managing car showrooms, inventory, and rental services. Built with a Spring Boot backend and a modern HTML/CSS/JS frontend.

## 🚀 Features

### 🔐 Authentication Module

- **User Registration:** Create personal accounts and customer profiles.
- **User Login:** Role-based access for Customers, Employees, and Admins.
- **Session Management:** Secure access to personalized dashboards.

### 🚗 Car Management

- **Inventory Tracking:** Manage car specifications (Company, Model, Year, Color).
- **Physical Unit Management:** Track individual units across different branches.
- **Dynamic Pricing:** Maintain price history for accurate contract generation.

### 🏢 Branch & Employee Management

- **Branch Operations:** Create and modify physical showroom/rental locations.
- **Employee Onboarding:** Manage employee records, job assignments, and salary history.
- **Supervision:** Track employee hierarchy and reporting structures.

### 🔍 Search & Renting Process

- **Advanced Search:** Filter cars by company, model, color, or location.
- **Rental Contracts:** Streamlined booking process for customers.

## 🛠️ Technology Stack

- **Backend:** [Java](https://www.java.com/) with [Spring Boot](https://spring.io/projects/spring-boot)
- **Frontend:** HTML5, CSS3, JavaScript
- **Database:** MySQL (Schema included in `schema_creation.sql`)
- **Build Tool:** Maven

## 📊 System Diagrams

Comprehensive visual documentation of the system's architecture and flows:

- **Class Diagram:** [class_diagram.drawio](file:///d:/mycar_showroom/Car_ShowRoom/class_diagram.drawio) (Native Draw.io format) | [class_diagram.mermaid](file:///d:/mycar_showroom/Car_ShowRoom/class_diagram.mermaid) (Mermaid source)
- **Sequence Diagrams:** [sequence_diagrams.drawio](file:///d:/mycar_showroom/Car_ShowRoom/sequence_diagrams.drawio)
- **Use Case Diagram:** [usecase.drawio](file:///d:/mycar_showroom/Car_ShowRoom/usecase.drawio)
- **Activity Diagram:** [activity daigram.draw.io](file:///d:/mycar_showroom/Car_ShowRoom/activity%20daigram.draw.io)
- **State Diagram:** [5_state_diagram.mermaid](file:///d:/mycar_showroom/Car_ShowRoom/5_state_diagram.mermaid)
- **Object Diagram:** [6_object_diagram.mermaid](file:///d:/mycar_showroom/Car_ShowRoom/6_object_diagram.mermaid)

## 📂 Project Structure

- `frontend/`: Contains all client-side assets (HTML, CSS, JS).
- `src/`: Java source code for the Spring Boot application.
- `schema_creation.sql`: SQL script for database setup.
- `use_case_descriptions.md`: Detailed functional requirements.

## ⚙️ Setup & Installation

1. **Database Setup:**
   - Execute the `schema_creation.sql` script in your MySQL environment to create the necessary tables and relationships.
   - Execute `setup_database.sql` for initial data setup.
2. **Backend Configuration:**
   - Update `src/main/resources/application.properties` with your database credentials.
   - Run the application using Maven: `./mvnw spring-boot:run`
3. **Frontend Access:**
   - Open `frontend/index.html` in your browser or serve it using a local web server.

## 📄 License

This project is open-source and available for educational purposes.

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #ff6b6b;
}
```
