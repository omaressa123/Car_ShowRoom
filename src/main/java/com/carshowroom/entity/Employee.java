package com.carshowroom.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;





@Entity
@Table(name = "employee")
public class Employee {
    @Id
    private int  SSN;
    private String fname;
    private String lname;
    private String street;

    @ManyToOne
    @JoinColumn(name="city_id")
    private City city_id;

    private int building_number;
    private long phone_1;
    private long phone_2;

    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender_id;

    private Date birthdate;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job_id;

   

    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    private Employee supervisor_id;

    @OneToMany(mappedBy = "supervisor")
    private List<Employee> supervisor;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    public int getSSN() {
        return SSN;
    }

    public void setSSN(int SSN) {
        this.SSN = SSN;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public City getCity_id() {
        return city_id;
    }

    public void setCity_id(City city_id) {
        this.city_id = city_id;
    }

    public int getBuilding_number() {
        return building_number;
    }

    public void setBuilding_number(int building_number) {
        this.building_number = building_number;
    }

    public long getPhone_1() {
        return phone_1;
    }

    public void setPhone_1(long phone_1) {
        this.phone_1 = phone_1;
    }

    public long getPhone_2() {
        return phone_2;
    }

    public void setPhone_2(long phone_2) {
        this.phone_2 = phone_2;
    }

    public Gender getGender_id() {
        return gender_id;
    }

    public void setGender_id(Gender gender_id) {
        this.gender_id = gender_id;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public Job getJob_id() {
        return job_id;
    }

    public void setJob_id(Job job_id) {
        this.job_id = job_id;
    }

    public Employee getSupervisor_id() {
        return supervisor_id;
    }

    public void setSupervisor_id(Employee supervisor_id) {
        this.supervisor_id = supervisor_id;
    }

    public List<Employee> getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(List<Employee> supervise) {
        this.supervisor = supervise;
    }

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

   
}
