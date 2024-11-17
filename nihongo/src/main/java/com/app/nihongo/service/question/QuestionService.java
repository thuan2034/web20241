package com.app.nihongo.service.question;

import com.app.nihongo.enums.QuestionType;
import org.springframework.http.ResponseEntity;

public interface QuestionService {
    ResponseEntity<?> getQuestionsByTypeAndLessonId(Integer userId, QuestionType type, Integer lessonId);
}
