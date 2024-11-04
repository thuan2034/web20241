package com.app.nihongo.controller;

import com.app.nihongo.dto.UnitDTO;
import com.app.nihongo.service.unit.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/units")
public class UnitController {

    @Autowired
    private UnitService unitService;

    @GetMapping
    public ResponseEntity<List<UnitDTO>> getAllUnits() {
        return unitService.getAllUnits();
    }

    @GetMapping("/{unitId}")
    public ResponseEntity<UnitDTO> getUnitById(@PathVariable Integer unitId) {
        return unitService.getUnitById(unitId);
    }
}
