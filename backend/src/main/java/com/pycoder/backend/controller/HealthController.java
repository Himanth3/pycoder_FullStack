package com.pycoder.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String home() {
        return "CodeVerse Backend Running Successfully 🚀";
    }

    @GetMapping("/api/health")
    public String health() {
        return "Backend is live";
    }
}
