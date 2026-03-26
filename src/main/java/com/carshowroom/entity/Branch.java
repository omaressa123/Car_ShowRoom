package com.carshowroom.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "branch")
public class Branch {
    @Id
    private int branch_id;
    private String street;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city_id;

    private int building_number;
    private int contact_number;

    public int getBranch_id() {
        return branch_id;
    }

    public void setBranch_id(int branch_id) {
        this.branch_id = branch_id;
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

    public int getContact_number() {
        return contact_number;
    }

    public void setContact_number(int contact_number) {
        this.contact_number = contact_number;
    }
}
