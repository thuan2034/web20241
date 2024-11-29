package com.app.nihongo.dto;

import lombok.Data;
import java.util.List;

@Data
public class MultipleChoiceQuestionDTO {
    private Integer id;
    private String question;
    private Boolean completed;
    private List<MultipleChoiceQuestionOptionDTO> challengeOptions;
}
