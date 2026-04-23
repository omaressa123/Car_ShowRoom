package com.carshowroom.mycar_showroom.controller;

import com.carshowroom.mycar_showroom.dto.ResponseWrapper;
import com.carshowroom.mycar_showroom.entity.Color;
import com.carshowroom.mycar_showroom.repository.ColorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/colors")
public class ColorController {

    @Autowired
    private ColorRepository colorRepository;

    @GetMapping
    public ResponseEntity<ResponseWrapper<List<Map<String, Object>>>> getAll() {
        List<Map<String, Object>> colors = colorRepository.findAllByOrderByNameAsc()
                .stream()
                .map(c -> Map.<String, Object>of("id", c.getId(), "name", c.getName()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(ResponseWrapper.success("Colors retrieved", colors));
    }

    @PostMapping
    public ResponseEntity<ResponseWrapper<Map<String, Object>>> addColor(@RequestBody Map<String, String> body) {
        String name = body.getOrDefault("name", "").trim();
        if (name.isBlank()) {
            return ResponseEntity.badRequest().body(ResponseWrapper.error("Color name cannot be empty"));
        }
        if (colorRepository.existsByNameIgnoreCase(name)) {
            return ResponseEntity.badRequest().body(ResponseWrapper.error("Color '" + name + "' already exists"));
        }
        Color saved = colorRepository.save(new Color(name));
        return ResponseEntity.ok(ResponseWrapper.success("Color added", Map.of("id", saved.getId(), "name", saved.getName())));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Void>> deleteColor(@PathVariable Long id) {
        if (!colorRepository.existsById(id)) {
            return ResponseEntity.badRequest().body(ResponseWrapper.error("Color not found"));
        }
        colorRepository.deleteById(id);
        return ResponseEntity.ok(ResponseWrapper.success("Color deleted"));
    }
}
