package com.app.nihongo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Kana_Table")
public class KanaTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer kanaId;

    private String kanaCharacter;
    private String pronunciation;

    // Getters and Setters
}
