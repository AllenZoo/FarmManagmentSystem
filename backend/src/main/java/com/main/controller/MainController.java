package com.main.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
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

}
