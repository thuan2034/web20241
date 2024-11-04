package com.app.nihongo.service.lesson;

import com.app.nihongo.dao.LessonRepository;
import com.app.nihongo.dto.LessonDTO;
import com.app.nihongo.entity.Lesson;
import com.app.nihongo.mapper.LessonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonServiceImpl implements LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private LessonMapper lessonMapper;

    @Override
    public ResponseEntity<List<LessonDTO>> getLessonsByUnitId(Integer unitId) {
        List<Lesson> lessons = lessonRepository.findByUnit_UnitId(unitId);
        List<LessonDTO> lessonDTOs = lessons.stream().map(lessonMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(lessonDTOs);
    }
    @Override
    public ResponseEntity<LessonDTO> getLessonById(Integer lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new RuntimeException("Lesson not found"));
        return ResponseEntity.ok(lessonMapper.toDto(lesson));
    }
}
