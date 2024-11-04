package com.app.nihongo.service.unit;

import com.app.nihongo.dto.UnitDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UnitService {
    ResponseEntity<List<UnitDTO>> getAllUnits();
    ResponseEntity<UnitDTO> getUnitById(Integer unitId);
}
