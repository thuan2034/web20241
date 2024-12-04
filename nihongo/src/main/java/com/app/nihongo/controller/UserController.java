package com.app.nihongo.controller;

import com.app.nihongo.dao.UserRepository;
import com.app.nihongo.dto.UserExpDTO;
import com.app.nihongo.dto.UserInfoDTO;
import com.app.nihongo.dto.UserProgressDTO;
import com.app.nihongo.service.user.UserService;
import com.app.nihongo.service.userprogress.UserProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/experience/{userId}")
    public ResponseEntity<?> getExperience(@PathVariable Integer userId) {
        Integer exp = userService.getUserExperience(userId);
        return ResponseEntity.ok(exp);
    }
    @GetMapping("/experience-by-level")
    public ResponseEntity<List<UserExpDTO>> getUserExperienceByLevel(@RequestParam String level) {
        List<UserExpDTO> expList = userService.getUserExpByLevel(level);
        return ResponseEntity.ok(expList);
    }
    @GetMapping("/info/{userId}")
    public ResponseEntity<UserInfoDTO> getUserInfo(@PathVariable Integer userId) {
        return userService.getUserInfoById(userId);
    }
}
