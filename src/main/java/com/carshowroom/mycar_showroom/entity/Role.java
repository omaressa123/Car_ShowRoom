package com.carshowroom.mycar_showroom.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long role_id;

    private String name; // ADMIN, CUSTOMER

    public Role() {}

    public Role(String name) {
        this.name = name;
    }

    public Long getId() { return role_id; }
    public void setId(Long id) { this.role_id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    @Override
    public String toString() {
        return "Role{" + "id=" + role_id + ", name='" + name + '\'' + '}';
    }
}
