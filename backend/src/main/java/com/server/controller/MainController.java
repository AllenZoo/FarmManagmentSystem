package com.server.controller;

import controller.FarmingSystem;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.LivestockModel;
import model.enums.AnimalType;
import model.enums.CropType;

import org.json.JSONArray;
import org.springframework.web.bind.annotation.*;

import util.JSONParser;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api")
public class MainController {

    private FarmingSystem system;
    private JSONParser parser;

    public MainController() {
        system = new FarmingSystem();
        parser = new JSONParser();
    }

    /**
     * Main Page
     */
    @RequestMapping(value = "/", method = GET)
    public String main() {
        return "Farm Management System is running!";
    }

    /**
     * Handles Login Requests
     * Inspired by: https://stackoverflow.com/questions/29313687/trying-to-use-spring-boot-rest-to-read-json-string-from-post
     */
    @RequestMapping(value = "/login", method = POST)
    public boolean login(@RequestBody Map<String, Object> map) {
        Object username = map.get("username");
        Object password = map.get("password");
        // System.out.println("Username: " + username + " password: " + password);
        return system.login(username.toString(), password.toString());
    }

    /**
     * Handles Logout Requests
     */
    @RequestMapping(value = "/logout", method = GET)
    public boolean logout() {
        return system.logout();
    }

    /**
     * Handles Retrieving Livestock Requests
     * 
     * TODO: overload this method to allow for filtering (need to use POST)
     */
    @RequestMapping(value = "/livestock", method = GET)
    public void getLivestock(HttpServletRequest req, HttpServletResponse res) throws IOException {
        JSONArray livestock = system.getLivestock();
        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(livestock);
        out.flush();
    }

    /**
     * Handles Insert Livestock Requests
     */
    @RequestMapping(value = "/livestock/insert", method = POST)
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
        return system.insertLivestock(model);
    }

    // For Ref!
    //    @RequestMapping(value = "/login", method = POST)
    //    public boolean login(HttpServletRequest req, HttpServletResponse res, Model model) throws IOException {
    //
    //    }
}
