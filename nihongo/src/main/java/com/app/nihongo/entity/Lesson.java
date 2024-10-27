package com.app.nihongo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer lessonId;

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private Unit unit;

    private String lessonTitle;

    // Getters and Setters
}
