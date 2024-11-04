package com.app.nihongo.service.unit;

import com.app.nihongo.dao.UnitRepository;
import com.app.nihongo.dto.UnitDTO;
import com.app.nihongo.entity.Unit;
import com.app.nihongo.mapper.UnitMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnitServiceImpl implements UnitService {

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private UnitMapper unitMapper;

    @Override
    public ResponseEntity<List<UnitDTO>> getAllUnits() {
        List<Unit> units = unitRepository.findAll();
        List<UnitDTO> unitDTOs = units.stream().map(unitMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(unitDTOs);
    }
    @Override
    public ResponseEntity<UnitDTO> getUnitById(Integer unitId) {
        Unit unit = unitRepository.findById(unitId).orElseThrow(() -> new RuntimeException("Unit not found"));
        return ResponseEntity.ok(unitMapper.toDto(unit));
    }
}
