package com.app.nihongo.service.question;

import com.app.nihongo.dto.UserFailedQuestionDTO;
import com.app.nihongo.enums.QuestionType;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface QuestionService {
    ResponseEntity<?> getQuestionsByTypeAndLessonId(Integer userId, QuestionType type, Integer lessonId);

    List<UserFailedQuestionDTO> getFailedQuestionsByUserId(Integer userId);

    ResponseEntity<?> getQuestionContentByTypeAndId(QuestionType type, Integer questionId);
}
