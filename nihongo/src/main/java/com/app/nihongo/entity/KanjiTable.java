package com.app.nihongo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Kanji_Table")
public class KanjiTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer kanjiId;

    private String kanjiCharacter;

    @Column(columnDefinition = "TEXT")
    private String meaning;

    private String pronunciation;

    // Getters and Setters
}
