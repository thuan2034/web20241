package com.app.nihongo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer lessonId;
    private String lessonTitle;
    private Integer displayOrder;
    private String status;
    private String type;

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private Unit unit;





    // Getters and Setters
}
