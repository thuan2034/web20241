package com.app.nihongo.controller;

import com.app.nihongo.dto.LessonDTO;
import com.app.nihongo.service.lesson.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/units")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @GetMapping("/{unitId}/lessons")
    public ResponseEntity<List<LessonDTO>> getLessonsByUnitId(@PathVariable Integer unitId) {
        return lessonService.getLessonsByUnitId(unitId);
    }
    @GetMapping("/lessons/{lessonId}")
    public ResponseEntity<LessonDTO> getLessonById(@PathVariable Integer lessonId) {
        return lessonService.getLessonById(lessonId);
    }
}
