package com.app.nihongo.dto;

import lombok.Data;

@Data
public class MultipleChoiceQuestionOptionDTO {
    private Integer id;
    private String option;
    private Boolean isCorrect;
}