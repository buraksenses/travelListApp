package com.sirhot.Travel.List.Project.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "item")
@Data
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "packed")
    private boolean packed;

    @Column(name = "description")
    private String description;

    @Column(name = "quantity")
    private int quantity;
}
