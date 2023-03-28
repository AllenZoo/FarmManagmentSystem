package com.example.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping("/")
    public String helloWorld() {
        return "Hello World from Spring Boot";
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping("/goodbye")
    public String goodbye() {
        return "Goodbye from Spring Boot";
    }

}
