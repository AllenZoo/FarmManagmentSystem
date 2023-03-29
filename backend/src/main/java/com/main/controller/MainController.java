package com.main.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    /**
     * Hello :)
     */
    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping("/")
    public String helloWorld() {
        return "Hello World from Spring Boot";
    }

    /**
     * Goodbye :)
     */
    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping("/goodbye")
    public String goodbye() {
        return "Goodbye from Spring Boot";
    }

    /**
     * Login API
     */
    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping(value = "/api/login", consumes = "application/json", produces = "application/json")
    public String login(@RequestBody Map<String, Object> payload) {
        String username = (String) payload.get("username");
        String password = (String) payload.get("password");
        return "Hello " + username + "!";
    }
}
