package com.app.nihongo.service.lesson;

import com.app.nihongo.dto.LessonDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LessonService {
    ResponseEntity<List<LessonDTO>> getLessonsByUnitId(Integer unitId);
    ResponseEntity<LessonDTO> getLessonById(Integer lessonId);
}
