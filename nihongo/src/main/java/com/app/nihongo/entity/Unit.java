package com.app.nihongo.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Units")
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer unitId;

    private String level;
    private String unitTitle;

    // Getters and Setters
}
