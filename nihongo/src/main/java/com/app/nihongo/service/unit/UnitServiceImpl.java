package com.app.nihongo.service.unit;

import com.app.nihongo.dao.LessonRepository;
import com.app.nihongo.dao.UnitRepository;
import com.app.nihongo.dto.LessonDTO;
import com.app.nihongo.dto.UnitDTO;
import com.app.nihongo.entity.Lesson;
import com.app.nihongo.entity.Unit;
import com.app.nihongo.mapper.LessonMapper;
import com.app.nihongo.mapper.UnitMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnitServiceImpl implements UnitService {

    @Autowired
    private UnitRepository unitRepository;
    @Autowired
    private UnitMapper unitMapper;
    @Autowired
    private LessonMapper lessonMapper;
    @Autowired
    private LessonRepository lessonRepository;

    @Override
    public ResponseEntity<List<UnitDTO>> getAllUnits() {
            List<Unit> units = unitRepository.findAll();
            List<UnitDTO> result = new ArrayList<>();

            for (Unit unit : units) {
                List<Lesson> lessons = lessonRepository.findByUnit_UnitId(unit.getUnitId());
                List<LessonDTO> lessonDTOs = lessons.stream()
                        .map(lessonMapper::toDto)
                        .collect(Collectors.toList());

                UnitDTO unitWithLessonsDTO =  unitMapper.toDto(unit);
                unitWithLessonsDTO.setLessons(lessonDTOs);
                result.add(unitWithLessonsDTO);
            }
            return ResponseEntity.ok(result);

    }

    @Override
    public ResponseEntity<List<UnitDTO>> getUnitsByLevel(String level) {
        List<Unit> units = unitRepository.findByLevel(level);
        List<UnitDTO> result = new ArrayList<>();

        for (Unit unit : units) {
            List<Lesson> lessons = lessonRepository.findByUnit_UnitId(unit.getUnitId());
            List<LessonDTO> lessonDTOs = lessons.stream()
                    .map(lessonMapper::toDto)
                    .collect(Collectors.toList());

            UnitDTO unitWithLessonsDTO =  unitMapper.toDto(unit);
            unitWithLessonsDTO.setLessons(lessonDTOs);
            result.add(unitWithLessonsDTO);
        }
        return ResponseEntity.ok(result);

    }
    @Override
    public ResponseEntity<UnitDTO> getUnitById(Integer unitId) {
        Unit unit = unitRepository.findById(unitId).orElseThrow(() -> new RuntimeException("Unit not found"));
        return ResponseEntity.ok(unitMapper.toDto(unit));
    }
}
