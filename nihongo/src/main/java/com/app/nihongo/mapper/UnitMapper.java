package com.app.nihongo.mapper;

import com.app.nihongo.dto.UnitDTO;
import com.app.nihongo.entity.Unit;
import org.springframework.stereotype.Component;

@Component
public class UnitMapper {
    public UnitDTO toDto(Unit unit) {
        UnitDTO unitDTO = new UnitDTO();
        unitDTO.setId(unit.getUnitId());
        unitDTO.setDisplayOrder(unit.getDisplayOrder());
        unitDTO.setName(unit.getName());
        unitDTO.setLevel(unit.getLevel()); // Map level
        return unitDTO;
    }

    public Unit toEntity(UnitDTO unitDTO) {
        Unit unit = new Unit();
        unit.setUnitId(unitDTO.getId());
        unit.setDisplayOrder(unitDTO.getDisplayOrder());
        unit.setName(unitDTO.getName());
        unit.setLevel(unitDTO.getLevel());
        return unit;
    }
}

