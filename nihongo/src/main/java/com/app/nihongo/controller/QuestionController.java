package com.app.nihongo.controller;

import com.app.nihongo.enums.QuestionType;
import com.app.nihongo.service.question.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/{lessonId}")
    public ResponseEntity<?> getQuestionsByTypeAndLessonId(
            @RequestParam Integer userId,
            @RequestParam("type") QuestionType type,
            @PathVariable Integer lessonId) {
        return questionService.getQuestionsByTypeAndLessonId(userId, type, lessonId);
    }
}
