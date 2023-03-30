package com.server.controller;

import ch.qos.logback.core.model.Model;
import controller.FarmingSystem;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.LivestockModel;
import model.enums.AnimalType;
import model.enums.CropType;
import org.springframework.web.bind.annotation.*;
import util.JSONParser;

import java.io.IOException;
import java.sql.Date;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class MainController {

    private FarmingSystem system;
    private JSONParser parser;


    public MainController() {
        system = new FarmingSystem();
        parser = new JSONParser();
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



    /**
     * Handles Login Requests
     * Inspired by: https://stackoverflow.com/questions/29313687/trying-to-use-spring-boot-rest-to-read-json-string-from-post
     */
    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping(value = "/api/login", method = POST)
    public boolean login(@RequestBody Map<String, Object> map) {
        Object username = map.get("username");
        Object password = map.get("password");
        System.out.println("Username: " + username + " password: " + password);
        return system.login(username.toString(), password.toString());
    }

    /**
     * Handles Logout Requests
     */
    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping(value = "/api/logout", method = GET)
    public boolean logout() {
        return system.logout();
    }


    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping(value = "/api/insert/livestock", method = POST)
    public boolean insertLiveStock(@RequestBody Map<String, Object> map) {
        int tagID = (int) map.get("tagID");
        AnimalType animalType =  AnimalType.valueOf(map.get("animalType").toString());
        int age = (int) map.get("age");
        CropType diet = CropType.valueOf(map.get("diet").toString());
        double weight = (double) map.get("weight");
        Date lastFed =  parser.parseDate(map.get("lastFed").toString());
        boolean harvestable = Boolean.valueOf(map.get("harvestable").toString());
        Date lastViolatedForHarvestedGoods =
                parser.parseDate(map.get("lastViolatedForHarvestedGoods").toString());

        System.out.println(tagID + " " + animalType + " " + age + " " + diet + " "
                + weight + " " + lastFed + " " + harvestable + " " + lastViolatedForHarvestedGoods);

        LivestockModel model = new LivestockModel(tagID, animalType,
                age, diet, weight, lastFed, harvestable, lastViolatedForHarvestedGoods);
        //return system.insertLivestock(model);
        return true;
    }

    // For Ref!
    //    @CrossOrigin(origins = "http://localhost:8080")
    //    @RequestMapping(value = "/login", method = POST)
    //    public boolean login(HttpServletRequest req, HttpServletResponse res, Model model) throws IOException {
    //
    //    }
}
