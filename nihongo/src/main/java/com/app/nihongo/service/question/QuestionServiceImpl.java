package com.app.nihongo.service.question;

import com.app.nihongo.dao.FlashcardRepository;
import com.app.nihongo.dao.MultipleChoiceQuestionRepository;
import com.app.nihongo.dao.UserMultipleChoiceQuestionRepository;
import com.app.nihongo.dto.FlashcardDTO;
import com.app.nihongo.dto.MultipleChoiceQuestionDTO;
import com.app.nihongo.dto.UserFailedQuestionDTO;
import com.app.nihongo.enums.QuestionType;
import com.app.nihongo.mapper.FlashcardMapper;
import com.app.nihongo.mapper.MultipleChoiceQuestionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private FlashcardRepository flashcardRepository;

    @Autowired
    private MultipleChoiceQuestionRepository multipleChoiceQuestionRepository;

    @Autowired
    private UserMultipleChoiceQuestionRepository userMultipleChoiceQuestionRepository;

    @Autowired
    private FlashcardMapper flashcardMapper;

    @Autowired
    private MultipleChoiceQuestionMapper multipleChoiceQuestionMapper;

    @Override
    public ResponseEntity<?> getQuestionsByTypeAndLessonId(Integer userId, QuestionType type, Integer lessonId) {
        switch (type) {
            case FLASHCARD:
                List<FlashcardDTO> flashcards = flashcardRepository.findByLesson_LessonId(lessonId)
                        .stream()
                        .map(flashcardMapper::toDto)
                        .collect(Collectors.toList());
                return ResponseEntity.ok(flashcards);

            case MULTIPLE_CHOICE:
                List<MultipleChoiceQuestionDTO> mcqs = multipleChoiceQuestionRepository.findByLesson_LessonId(lessonId)
                        .stream()
                        .map(mcq -> {
                            Boolean isCompleted = userMultipleChoiceQuestionRepository.existsByUser_UserIdAndMultipleChoiceQuestion_McqId(userId, mcq.getMcqId());
                            return multipleChoiceQuestionMapper.toDto(mcq, isCompleted);
                        })
                        .collect(Collectors.toList());
                return ResponseEntity.ok(mcqs);

            default:
                throw new IllegalArgumentException("Invalid question type");
        }
    }

    @Override
    public List<UserFailedQuestionDTO> getFailedQuestionsByUserId(Integer userId) {

        List<UserFailedQuestionDTO> failedQuestions = userMultipleChoiceQuestionRepository.findFailedMultipleChoiceQuestionsByUserId(userId);

        return failedQuestions;
    }

    @Override
    public ResponseEntity<?> getQuestionContentByTypeAndId(QuestionType type, Integer questionId) {
        switch (type) {
            case FLASHCARD:
                FlashcardDTO flashcard = flashcardRepository.findById(questionId)
                        .map(flashcardMapper::toDto)
                        .orElseThrow(() -> new IllegalArgumentException("Flashcard not found with ID: " + questionId));
                return ResponseEntity.ok(flashcard);

            case MULTIPLE_CHOICE:
                MultipleChoiceQuestionDTO mcq = multipleChoiceQuestionRepository.findById(questionId)
                        .map(mcqEntity -> {
                            Boolean isCompleted = userMultipleChoiceQuestionRepository.existsByUser_UserIdAndMultipleChoiceQuestion_McqId(null, mcqEntity.getMcqId());
                            return multipleChoiceQuestionMapper.toDto(mcqEntity, isCompleted);
                        })
                        .orElseThrow(() -> new IllegalArgumentException("Multiple choice question not found with ID: " + questionId));
                return ResponseEntity.ok(mcq);

            default:
                throw new IllegalArgumentException("Invalid question type: " + type);
        }
    }

}
