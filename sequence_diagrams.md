# Sequence Diagrams for Car Showroom Use Cases

This file contains sequence diagrams for the primary use cases of the Car Showroom Management System. You can copy the Mermaid code blocks below and paste them into [draw.io](https://app.diagrams.net/) (via **+** > **Advanced** > **Mermaid**) to generate the diagrams.

## UC-01: User Registration

```mermaid
sequenceDiagram
    actor Customer
    participant System
    participant Database

    Customer->>System: Select "Sign Up"
    System-->>Customer: Request personal details
    Customer->>System: Provide details & credentials
    System->>Database: Validate uniqueness (SSN, Username)
    Database-->>System: Validation success
    System->>Database: Create Customer profile & Account
    Database-->>System: Success
    System-->>Customer: Confirm registration
```

---

## UC-02: User Login

```mermaid
sequenceDiagram
    actor User
    participant System
    participant Database

    User->>System: Enter username & password
    System->>Database: Verify credentials
    Database-->>System: Valid credentials & role info
    System->>System: Generate session token
    System-->>User: Redirect to dashboard
```

---

## UC-03: Manage Car Inventory

```mermaid
sequenceDiagram
    actor Admin
    participant System
    participant Database

    Admin->>System: Select "Manage Inventory"
    System-->>Admin: Show inventory form
    Admin->>System: Enter car details & branch assignment
    System->>Database: Update Car & car_branch tables
    Database-->>System: Success
    System-->>Admin: Display confirmation
```

---

## UC-04: Update Car Pricing

```mermaid
sequenceDiagram
    actor Admin
    participant System
    participant Database

    Admin->>System: Select car from inventory
    Admin->>System: Enter new price & effective date
    System->>Database: Add entry to Car_Price_History
    Database-->>System: Success
    System-->>Admin: Confirm price update
```

---

## UC-05: Manage Branches

```mermaid
sequenceDiagram
    actor Admin
    participant System
    participant Database

    Admin->>System: Enter branch location & contact
    System->>Database: Validate city exists
    Database-->>System: Valid city
    System->>Database: Create branch record
    Database-->>System: Success
    System-->>Admin: Confirm branch creation
```

---

## UC-06: Search & Filter Cars

```mermaid
sequenceDiagram
    actor User
    participant System
    participant Database

    User->>System: Select search criteria (brand, location, etc.)
    System->>Database: Query Car & branch tables
    Database-->>System: Return matching cars & prices
    System-->>User: Display results list
```

---

## UC-07: Create Rental Contract

```mermaid
sequenceDiagram
    actor Customer
    actor Employee
    participant System
    participant Database

    Customer->>System: Select car & branch
    Employee->>System: Verify Customer SSN & Availability
    System->>Database: Check availability & retrieve latest price
    Database-->>System: Available + Price data
    Customer->>System: Select payment method
    System->>Database: Create Contract record
    System->>Database: Decrement car_branch inventory
    Database-->>System: Success
    System-->>Customer: Generate contract confirmation
```
