// Sample data based on the database schema
const sampleData = {
    companies: [
        { company_id: 1, name: 'Toyota' },
        { company_id: 2, name: 'Honda' },
        { company_id: 3, name: 'Mercedes' },
        { company_id: 4, name: 'BMW' },
        { company_id: 5, name: 'Audi' }
    ],
    models: [
        { model_id: 1, model_name: 'Corolla' },
        { model_id: 2, model_name: 'Camry' },
        { model_id: 3, model_name: 'Civic' },
        { model_id: 4, model_name: 'Accord' },
        { model_id: 5, model_name: 'C-Class' },
        { model_id: 6, model_name: 'E-Class' },
        { model_id: 7, model_name: '3 Series' },
        { model_id: 8, model_name: '5 Series' },
        { model_id: 9, model_name: 'A4' },
        { model_id: 10, model_name: 'A6' }
    ],
    years: [
        { year_id: 1, year: 2024 },
        { year_id: 2, year: 2023 },
        { year_id: 3, year: 2022 },
        { year_id: 4, year: 2021 },
        { year_id: 5, year: 2020 }
    ],
    cars: [
        { car_id: 1, company_id: 1, model_id: 1, year_id: 1 },
        { car_id: 2, company_id: 1, model_id: 2, year_id: 1 },
        { car_id: 3, company_id: 2, model_id: 3, year_id: 2 },
        { car_id: 4, company_id: 3, model_id: 5, year_id: 1 },
        { car_id: 5, company_id: 4, model_id: 7, year_id: 2 },
        { car_id: 6, company_id: 5, model_id: 9, year_id: 1 }
    ],
    colors: [
        { color_id: 1, color_name: 'White' },
        { color_id: 2, color_name: 'Black' },
        { color_id: 3, color_name: 'Silver' },
        { color_id: 4, color_name: 'Red' },
        { color_id: 5, color_name: 'Blue' },
        { color_id: 6, color_name: 'Gray' }
    ],
    carColors: [
        { car_id: 1, color_id: 1 },
        { car_id: 1, color_id: 2 },
        { car_id: 2, color_id: 3 },
        { car_id: 2, color_id: 4 },
        { car_id: 3, color_id: 5 },
        { car_id: 4, color_id: 2 },
        { car_id: 5, color_id: 6 },
        { car_id: 6, color_id: 1 }
    ],
    cities: [
        { city_id: 1, city_name: 'Cairo' },
        { city_id: 2, city_name: 'Alexandria' },
        { city_id: 3, city_name: 'Giza' },
        { city_id: 4, city_name: 'Shubra' },
        { city_id: 5, city_name: 'Mansoura' }
    ],
    branches: [
        { branch_id: 1, street: 'El Galaa Street', city_id: 1, building_number: 15, contact_number: 201234567890 },
        { branch_id: 2, street: 'Corniche Nile', city_id: 2, building_number: 25, contact_number: 201234567891 },
        { branch_id: 3, street: 'Tahrir Square', city_id: 1, building_number: 10, contact_number: 201234567892 },
        { branch_id: 4, street: 'King Fahd Street', city_id: 3, building_number: 30, contact_number: 201234567893 }
    ],
    carBranches: [
        { car_id: 1, branch_id: 1, no_of_cars: 5 },
        { car_id: 1, branch_id: 2, no_of_cars: 3 },
        { car_id: 2, branch_id: 1, no_of_cars: 4 },
        { car_id: 3, branch_id: 3, no_of_cars: 6 },
        { car_id: 4, branch_id: 2, no_of_cars: 2 },
        { car_id: 5, branch_id: 4, no_of_cars: 4 }
    ],
    carPrices: [
        { car_price_id: 1, car_id: 1, price: 450000, price_date: '2024-01-15' },
        { car_price_id: 2, car_id: 2, price: 550000, price_date: '2024-01-20' },
        { car_price_id: 3, car_id: 3, price: 380000, price_date: '2024-01-10' },
        { car_price_id: 4, car_id: 4, price: 850000, price_date: '2024-01-25' },
        { car_price_id: 5, car_id: 5, price: 750000, price_date: '2024-01-18' },
        { car_price_id: 6, car_id: 6, price: 650000, price_date: '2024-01-22' }
    ],
    jobs: [
        { job_id: 1, title: 'Branch Manager' },
        { job_id: 2, title: 'Sales Representative' },
        { job_id: 3, title: 'Accountant' },
        { job_id: 4, title: 'Maintenance Technician' },
        { job_id: 5, title: 'Car Consultant' }
    ],
    genders: [
        { gender_id: 1, gender: 'Male' },
        { gender_id: 2, gender: 'Female' }
    ],
    employees: [
        { SSN: 123456789, fname: 'Ahmed', lname: 'Mohamed', street: 'Nile Street', city_id: 1, building_number: 12, phone_1: 201012345678, phone_2: 201012345679, gender_id: 1, birth_date: '1985-05-15', job_id: 1, supervisor_id: 987654321, branch_id: 1 },
        { SSN: 987654321, fname: 'Fatima', lname: 'Ali', street: 'Freedom Street', city_id: 2, building_number: 8, phone_1: 201012345680, phone_2: 201012345681, gender_id: 2, birth_date: '1990-08-22', job_id: 2, supervisor_id: 123456789, branch_id: 1 },
        { SSN: 456789123, fname: 'Mohamed', lname: 'Ahmed', street: 'Republic Street', city_id: 3, building_number: 20, phone_1: 201012345682, phone_2: 201012345683, gender_id: 1, birth_date: '1988-03-10', job_id: 3, supervisor_id: 123456789, branch_id: 2 },
        { SSN: 789123456, fname: 'Mariam', lname: 'Hassan', street: 'El Saada Street', city_id: 1, building_number: 5, phone_1: 201012345684, phone_2: 201012345685, gender_id: 2, birth_date: '1992-11-28', job_id: 4, supervisor_id: 456789123, branch_id: 2 }
    ],
    salaryHistory: [
        { job_id: 1, EMP_SSN: 123456789, salary: 15000, comm_pct: 5.0, date: '2024-01-01' },
        { job_id: 2, EMP_SSN: 987654321, salary: 8000, comm_pct: 3.0, date: '2024-01-01' },
        { job_id: 3, EMP_SSN: 456789123, salary: 10000, comm_pct: null, date: '2024-01-01' },
        { job_id: 4, EMP_SSN: 789123456, salary: 7000, comm_pct: null, date: '2024-01-01' }
    ],
    paymentMethods: [
        { method_id: 1, method: 'Cash' },
        { method_id: 2, method: 'Credit Card' },
        { method_id: 3, method: 'Bank Transfer' },
        { method_id: 4, method: 'Installment' }
    ],
    customers: [
        { SSN: 111111111, fname: 'Omar', lname: 'Khaled', street: 'El Masreyia Street', city_id: 1, building_number: 18, phone_1: 201011111111, phone_2: 201011111112, gender_id: 1, birthdate: '1995-06-12' },
        { SSN: 222222222, fname: 'Nora', lname: 'Salem', street: 'El Zahraa Street', city_id: 2, building_number: 14, phone_1: 201022222222, phone_2: 201022222223, gender_id: 2, birthdate: '1993-09-25' },
        { SSN: 333333333, fname: 'Khaled', lname: 'Mahmoud', street: 'El Nasr Street', city_id: 3, building_number: 22, phone_1: 201033333333, phone_2: 201033333334, gender_id: 1, birthdate: '1991-12-08' },
        { SSN: 444444444, fname: 'Sarah', lname: 'Ahmed', street: 'El Salam Street', city_id: 1, building_number: 9, phone_1: 201044444444, phone_2: 201044444445, gender_id: 2, birthdate: '1994-04-17' }
    ],
    contracts: [
        { contract_id: 1, car_id: 1, branch_id: 1, EMP_SSN: 987654321, CUST_SSN: 111111111, method_id: 2, car_price_id: 1, contract_date: '2024-01-30' },
        { contract_id: 2, car_id: 2, branch_id: 1, EMP_SSN: 987654321, CUST_SSN: 222222222, method_id: 3, car_price_id: 2, contract_date: '2024-02-05' },
        { contract_id: 3, car_id: 3, branch_id: 3, EMP_SSN: 123456789, CUST_SSN: 333333333, method_id: 1, car_price_id: 3, contract_date: '2024-02-10' },
        { contract_id: 4, car_id: 4, branch_id: 2, EMP_SSN: 456789123, CUST_SSN: 444444444, method_id: 4, car_price_id: 4, contract_date: '2024-02-15' }
    ]
};

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const carModal = document.getElementById('carModal');
const branchModal = document.getElementById('branchModal');
const modalCloseButtons = document.querySelectorAll('.close');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadFilters();
    loadCars();
    loadBranches();
    loadEmployees();
    loadCustomers();
    loadContracts();
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close modals
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            carModal.style.display = 'none';
            branchModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === carModal) {
            carModal.style.display = 'none';
        }
        if (event.target === branchModal) {
            branchModal.style.display = 'none';
        }
    });

    // Filter changes
    document.getElementById('companyFilter').addEventListener('change', filterCars);
    document.getElementById('yearFilter').addEventListener('change', filterCars);
    document.getElementById('searchCar').addEventListener('input', filterCars);

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Load filters
function loadFilters() {
    const companyFilter = document.getElementById('companyFilter');
    const yearFilter = document.getElementById('yearFilter');

    // Load companies
    sampleData.companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company.company_id;
        option.textContent = company.name;
        companyFilter.appendChild(option);
    });

    // Load years
    sampleData.years.forEach(year => {
        const option = document.createElement('option');
        option.value = year.year_id;
        option.textContent = year.year;
        yearFilter.appendChild(option);
    });
}

// Load cars
function loadCars() {
    const carsGrid = document.getElementById('carsGrid');
    carsGrid.innerHTML = '';

    sampleData.cars.forEach(car => {
        const company = sampleData.companies.find(c => c.company_id === car.company_id);
        const model = sampleData.models.find(m => m.model_id === car.model_id);
        const year = sampleData.years.find(y => y.year_id === car.year_id);
        const price = sampleData.carPrices.find(p => p.car_id === car.car_id);
        const colors = sampleData.carColors.filter(cc => cc.car_id === car.car_id)
            .map(cc => sampleData.colors.find(c => c.color_id === cc.color_id));

        const carCard = createCarCard(car, company, model, year, price, colors);
        carsGrid.appendChild(carCard);
    });
}

// Create car card
function createCarCard(car, company, model, year, price, colors) {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.onclick = () => showCarDetails(car, company, model, year, price, colors);

    const colorDots = colors.map(color => 
        `<div class="color-dot" style="background-color: ${getColorHex(color.color_name)}" title="${color.color_name}"></div>`
    ).join('');

    card.innerHTML = `
        <div class="car-image">
            <i class="fas fa-car"></i>
            <div class="car-price">${price.price.toLocaleString()} ج.م</div>
        </div>
        <div class="car-info">
            <h3>${company.name} ${model.model_name}</h3>
            <p><i class="fas fa-calendar"></i> ${year.year}</p>
            <p><i class="fas fa-tag"></i> ${price.price.toLocaleString()} ج.م</p>
            <div class="car-colors">${colorDots}</div>
        </div>
    `;

    return card;
}

// Get color hex code
function getColorHex(colorName) {
    const colorMap = {
        'White': '#FFFFFF',
        'Black': '#000000',
        'Silver': '#C0C0C0',
        'Red': '#FF0000',
        'Blue': '#0000FF',
        'Gray': '#808080'
    };
    return colorMap[colorName] || '#CCCCCC';
}

// Show car details
function showCarDetails(car, company, model, year, price, colors) {
    const carDetails = document.getElementById('carDetails');
    const branches = sampleData.carBranches.filter(cb => cb.car_id === car.car_id)
        .map(cb => {
            const branch = sampleData.branches.find(b => b.branch_id === cb.branch_id);
            const city = sampleData.cities.find(c => c.city_id === branch.city_id);
            return { ...branch, city_name: city.city_name, no_of_cars: cb.no_of_cars };
        });

    const colorList = colors.map(color => color.color_name).join(', ');

    carDetails.innerHTML = `
        <h2>${company.name} ${model.model_name} ${year.year}</h2>
        <div style="margin-top: 1rem;">
            <p><strong>Price:</strong> ${price.price.toLocaleString()} EGP</p>
            <p><strong>Available Colors:</strong> ${colorList}</p>
            <p><strong>Price Update Date:</strong> ${price.price_date}</p>
            <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Available Branches:</h3>
            ${branches.map(branch => `
                <div style="background: #f8f9fa; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px;">
                    <p><strong>${branch.city_name} - ${branch.street}</strong></p>
                    <p>Building ${branch.building_number} | ${branch.contact_number}</p>
                    <p>Available Quantity: ${branch.no_of_cars} cars</p>
                </div>
            `).join('')}
        </div>
    `;

    carModal.style.display = 'block';
}

// Load branches
function loadBranches() {
    const branchesGrid = document.getElementById('branchesGrid');
    branchesGrid.innerHTML = '';

    sampleData.branches.forEach(branch => {
        const city = sampleData.cities.find(c => c.city_id === branch.city_id);
        const branchCard = createBranchCard(branch, city);
        branchesGrid.appendChild(branchCard);
    });
}

// Create branch card
function createBranchCard(branch, city) {
    const card = document.createElement('div');
    card.className = 'branch-card';
    card.onclick = () => showBranchDetails(branch, city);

    card.innerHTML = `
        <h3><i class="fas fa-store"></i> ${city.city_name} Branch</h3>
        <p><i class="fas fa-map-marker-alt"></i> ${branch.street}, Building ${branch.building_number}</p>
        <p><i class="fas fa-city"></i> ${city.city_name}</p>
        <p><i class="fas fa-phone"></i> ${branch.contact_number}</p>
    `;

    return card;
}

// Show branch details
function showBranchDetails(branch, city) {
    const branchDetails = document.getElementById('branchDetails');
    const cars = sampleData.carBranches.filter(cb => cb.branch_id === branch.branch_id)
        .map(cb => {
            const car = sampleData.cars.find(c => c.car_id === cb.car_id);
            const company = sampleData.companies.find(co => co.company_id === car.company_id);
            const model = sampleData.models.find(m => m.model_id === car.model_id);
            const year = sampleData.years.find(y => y.year_id === car.year_id);
            return { ...car, company_name: company.name, model_name: model.model_name, year: year.year, no_of_cars: cb.no_of_cars };
        });

    branchDetails.innerHTML = `
        <h2><i class="fas fa-store"></i> ${city.city_name} Branch</h2>
        <div style="margin-top: 1rem;">
            <p><strong>Address:</strong> ${branch.street}, Building ${branch.building_number}</p>
            <p><strong>City:</strong> ${city.city_name}</p>
            <p><strong>Phone:</strong> ${branch.contact_number}</p>
            <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Available Cars:</h3>
            ${cars.map(car => `
                <div style="background: #f8f9fa; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px;">
                    <p><strong>${car.company_name} ${car.model_name} ${car.year}</strong></p>
                    <p>Available Quantity: ${car.no_of_cars} cars</p>
                </div>
            `).join('')}
        </div>
    `;

    branchModal.style.display = 'block';
}

// Load employees
function loadEmployees() {
    const employeesGrid = document.getElementById('employeesGrid');
    employeesGrid.innerHTML = '';

    sampleData.employees.forEach(employee => {
        const job = sampleData.jobs.find(j => j.job_id === employee.job_id);
        const city = sampleData.cities.find(c => c.city_id === employee.city_id);
        const gender = sampleData.genders.find(g => g.gender_id === employee.gender_id);
        const employeeCard = createEmployeeCard(employee, job, city, gender);
        employeesGrid.appendChild(employeeCard);
    });
}

// Create employee card
function createEmployeeCard(employee, job, city, gender) {
    const card = document.createElement('div');
    card.className = 'employee-card';

    const initials = employee.fname.charAt(0) + employee.lname.charAt(0);

    card.innerHTML = `
        <div class="employee-avatar">${initials}</div>
        <h3>${employee.fname} ${employee.lname}</h3>
        <p><i class="fas fa-briefcase"></i> ${job.title}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${city.city_name}</p>
        <p><i class="fas fa-phone"></i> ${employee.phone_1}</p>
        <p><i class="fas fa-venus-mars"></i> ${gender.gender}</p>
    `;

    return card;
}

// Load customers
function loadCustomers() {
    const customersTable = document.getElementById('customersTable').getElementsByTagName('tbody')[0];
    customersTable.innerHTML = '';

    sampleData.customers.forEach(customer => {
        const city = sampleData.cities.find(c => c.city_id === customer.city_id);
        const row = createCustomerRow(customer, city);
        customersTable.appendChild(row);
    });
}

// Create customer row
function createCustomerRow(customer, city) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${customer.fname} ${customer.lname}</td>
        <td>${customer.phone_1}</td>
        <td>${city.city_name}</td>
        <td>${customer.birthdate}</td>
    `;

    return row;
}

// Load contracts
function loadContracts() {
    const contractsTable = document.getElementById('contractsTable').getElementsByTagName('tbody')[0];
    contractsTable.innerHTML = '';

    sampleData.contracts.forEach(contract => {
        const car = sampleData.cars.find(c => c.car_id === contract.car_id);
        const company = sampleData.companies.find(co => co.company_id === car.company_id);
        const model = sampleData.models.find(m => m.model_id === car.model_id);
        const customer = sampleData.customers.find(cu => cu.SSN === contract.CUST_SSN);
        const employee = sampleData.employees.find(e => e.SSN === contract.EMP_SSN);
        const price = sampleData.carPrices.find(p => p.car_price_id === contract.car_price_id);
        const paymentMethod = sampleData.paymentMethods.find(pm => pm.method_id === contract.method_id);

        const row = createContractRow(contract, company, model, customer, employee, price, paymentMethod);
        contractsTable.appendChild(row);
    });
}

// Create contract row
function createContractRow(contract, company, model, customer, employee, price, paymentMethod) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>#${contract.contract_id}</td>
        <td>${company.name} ${model.model_name}</td>
        <td>${customer.fname} ${customer.lname}</td>
        <td>${employee.fname} ${employee.lname}</td>
        <td>${contract.contract_date}</td>
        <td>${price.price.toLocaleString()} ج.م</td>
    `;

    return row;
}

// Filter cars
function filterCars() {
    const companyFilter = document.getElementById('companyFilter').value;
    const yearFilter = document.getElementById('yearFilter').value;
    const searchTerm = document.getElementById('searchCar').value.toLowerCase();

    const filteredCars = sampleData.cars.filter(car => {
        const company = sampleData.companies.find(c => c.company_id === car.company_id);
        const model = sampleData.models.find(m => m.model_id === car.model_id);
        const year = sampleData.years.find(y => y.year_id === car.year_id);

        const matchesCompany = !companyFilter || car.company_id == companyFilter;
        const matchesYear = !yearFilter || car.year_id == yearFilter;
        const matchesSearch = !searchTerm || 
            company.name.toLowerCase().includes(searchTerm) ||
            model.model_name.toLowerCase().includes(searchTerm);

        return matchesCompany && matchesYear && matchesSearch;
    });

    const carsGrid = document.getElementById('carsGrid');
    carsGrid.innerHTML = '';

    filteredCars.forEach(car => {
        const company = sampleData.companies.find(c => c.company_id === car.company_id);
        const model = sampleData.models.find(m => m.model_id === car.model_id);
        const year = sampleData.years.find(y => y.year_id === car.year_id);
        const price = sampleData.carPrices.find(p => p.car_id === car.car_id);
        const colors = sampleData.carColors.filter(cc => cc.car_id === car.car_id)
            .map(cc => sampleData.colors.find(c => c.color_id === cc.color_id));

        const carCard = createCarCard(car, company, model, year, price, colors);
        carsGrid.appendChild(carCard);
    });
}

// Navigation functions
function showCars() {
    document.getElementById('cars').scrollIntoView({ behavior: 'smooth' });
}

function showBranches() {
    document.getElementById('branches').scrollIntoView({ behavior: 'smooth' });
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
