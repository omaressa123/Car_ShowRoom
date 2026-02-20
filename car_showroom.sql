create table company(
    company_id int primary key,
    name varchar(255) not null
);

create table Car(
    car_id int primary key,
    company_id int not null,
    model varchar(255) not null,
    year date not null,
    foreign key (company_id) references company(company_id)
);
create table Branch(
    branch_id int primary key,
    street varchar(255) not null,
    city varchar(255) not null,
    building_number int not null,
    contact_number int not null
    
);
create table No_of_cars(
    car_id int not null,
    branch_id int not null,
    no_of_cars int not null,
    foreign key (car_id) references Car(car_id),
    foreign key (branch_id) references Branch(branch_id)
);
create table Car_Price_History(
	car_id int not null,
    price float not null,
    price_date date not null,
    foreign key (car_id) references Car(car_id)
);
create table color(
    color_id int primary key,
    color_name varchar(255) not null   
);

create table car_color(
    car_id int not null,
    color_id int not null,
    foreign key (car_id) references Car(car_id),
    foreign key (color_id) references Color(color_id)
);

create table job(
    job_id int primary key,
    title varchar(255) not null
);

create table employee(
    SSN int primary key,
    fname varchar(255) not null,
    lname varchar(255) not null,
	street varchar(255) not null,
    city varchar(255) not null,
    building_number int not null,
    phone_1 int not null,
    phone_2 int not null,
    gender varchar(255) not null,
    birth_date date not null,
    job_id int not null,
    supervisor int not null,
    branch_id int not null,
    foreign key (job_id) references job(job_id),
    foreign key (supervisor) references employee(SSN),
    foreign key (branch_id) references Branch(branch_id)
);

create table salary_of_jobs(
    job_id int not null,
    EMP_SSN int not null,
    salary float not null,
    comm_pct float null,
    foreign key (job_id) references job(job_id),
	foreign key (EMP_SSN) references employee(SSN)
);  



create table payment_method(
    method_id int primary key,
    method varchar(100) not null
);
create table customer(
    SSN int primary key,
    fname varchar(255) not null,
    lname varchar(255) not null,
    street varchar(255) not null,
    city varchar(255) not null,
    building_number int not null,
    phone_1 int not null,
    phone_2 int not null,
    gender varchar(255) not null,
    birthdate date not null    
);
create table Contract(
    contract_id int primary key,
    car_id int not null,
    branch_id int not null,
    EMP_SSN int not null,
    CUST_SSN int not null,
    method_id  int not null,
    contract_date date not null,
    foreign key (car_id) references car(car_id),
    foreign key (branch_id) references Branch(branch_id),
    foreign key (EMP_SSN) references employee(SSN),
    foreign key (CUST_SSN) references customer(SSN),
    foreign key (method_id) references payment_method(method_id)
);
