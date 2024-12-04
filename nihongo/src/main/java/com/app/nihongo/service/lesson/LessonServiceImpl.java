package com.app.nihongo.service.lesson;

import com.app.nihongo.dao.LessonRepository;
import com.app.nihongo.dao.UserLessonStatusRepository;
import com.app.nihongo.dto.LessonDTO;
import com.app.nihongo.entity.Lesson;
import com.app.nihongo.entity.User;
import com.app.nihongo.entity.UserLessonStatus;
import com.app.nihongo.entity.UserLessonStatusKey;
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
    private UserLessonStatusRepository userLessonStatusRepository;

    @Autowired
    private LessonMapper lessonMapper;

    @Override
    public ResponseEntity<List<LessonDTO>> getLessonsByUnitIdWithStatus(Integer unitId, Integer userId) {
        List<Lesson> lessons = lessonRepository.findByUnit_UnitId(unitId);
        List<LessonDTO> lessonDTOs = lessons.stream().map(lesson -> {
            UserLessonStatusKey key = new UserLessonStatusKey(userId, lesson.getLessonId());
            String status = userLessonStatusRepository.findById(key)
                    .map(UserLessonStatus::getStatus)
                    .orElse("locked");
            return lessonMapper.toDto(lesson, status);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(lessonDTOs);
    }

    @Override
    public ResponseEntity<?> updateLessonStatus(Integer userId, Integer lessonId, String status) {

        // Kiểm tra bài học hiện tại
        UserLessonStatusKey currentKey = new UserLessonStatusKey(userId, lessonId);
        UserLessonStatus currentStatus = userLessonStatusRepository.findById(currentKey)
                .orElse(null);

        if (currentStatus != null && "current".equals(currentStatus.getStatus())) {
            currentStatus.setStatus("completed");
            User user = currentStatus.getUser();
            userLessonStatusRepository.save(currentStatus);

            Integer nextLessonId = lessonId + 1;
            Lesson nextLesson = lessonRepository.findById(nextLessonId).orElse(null);

            if (nextLesson != null) {
                UserLessonStatusKey nextKey = new UserLessonStatusKey(userId, nextLessonId);
                UserLessonStatus nextLessonStatus = userLessonStatusRepository.findById(nextKey)
                        .orElse(new UserLessonStatus());
                nextLessonStatus.setId(nextKey);
                nextLessonStatus.setLesson(nextLesson);
                nextLessonStatus.setUser(user);
                nextLessonStatus.setStatus("current");
                userLessonStatusRepository.save(nextLessonStatus);
            }

            return ResponseEntity.ok("Update successfully");
        }

        return ResponseEntity.badRequest().build();
    }

//    @Override
//    public ResponseEntity<List<LessonDTO>> getLessonsByUnitId(Integer unitId) {
//        List<Lesson> lessons = lessonRepository.findByUnit_UnitId(unitId);
//        List<LessonDTO> lessonDTOs = lessons.stream().map(lessonMapper::toDto).collect(Collectors.toList());
//        return ResponseEntity.ok(lessonDTOs);
//    }
    @Override
    public ResponseEntity<LessonDTO> getLessonById(Integer lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new RuntimeException("Lesson not found"));
        return ResponseEntity.ok(lessonMapper.toDto(lesson));
    }


}
