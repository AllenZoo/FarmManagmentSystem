package com.server.controller;

import ch.qos.logback.core.model.Model;
import controller.FarmingSystem;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class MainController {

    private FarmingSystem system;

    public MainController() {
        system = new FarmingSystem();
    }

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


    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping(value = "/api/login", method = POST)
    public boolean login(@RequestBody Map<String, Object> map) {
        Object username = map.get("username");
        Object password = map.get("password");
        System.out.println("Username: " + username + " password: " + password);
        return system.login(username.toString(), password.toString());
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping(value = "/api/logout", method = GET)
    public boolean logout() {
        return system.logout();
    }


    // For Ref!
    //    @CrossOrigin(origins = "http://localhost:8080")
    //    @RequestMapping(value = "/login", method = POST)
    //    public boolean login(HttpServletRequest req, HttpServletResponse res, Model model) throws IOException {
    //
    //    }
}
