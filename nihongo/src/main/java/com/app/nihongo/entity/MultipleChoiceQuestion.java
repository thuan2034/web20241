package com.app.nihongo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Multiple_Choice_Questions")
public class MultipleChoiceQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mcqId;

    @Column(columnDefinition = "TEXT")
    private String questionContent;
    private String correctAnswer;
    private String option1;
    private String option2;
    private String option3;
    private String option4;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    // Getters and Setters
}

