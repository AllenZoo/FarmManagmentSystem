package com.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.LivestockModel;

import model.enums.AnimalType;
import model.enums.CropType;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import actions.FarmingSystem;
import util.JSONParser;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.*;

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
        JSONArray livestock = system.getLivestock(req);
        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(livestock);
        out.flush();
    }

    /**
     * Handles Filtering Livestock By: harvestable, animalType, min Age, max Age, diet
     */
    @RequestMapping(value = "livestock/filteredValues", method = POST)
    @ResponseBody
    public void getFilteredLivestock(@RequestBody Map<String, Object> map, HttpServletResponse res) throws IOException {
        // Check for if null for these values.
        String harvestable = (map.get("harvestable").toString());
        AnimalType animalType = AnimalType.valueOf(map.get("animalType").toString());
        CropType diet = CropType.valueOf(map.get("diet").toString());

        int minAge = (int) map.get("minAge");
        int maxAge = (int) map.get("maxAge");


        JSONArray livestock = system.getFilteredLivestock(harvestable, animalType, diet, minAge, maxAge);
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
        LivestockModel model = LivestockModel.fromJSON(new JSONObject(map));
        return system.insertLivestock(model);
    }

    /**
     * Handles Delete Livestock Requests
     */
    @RequestMapping(value = "/livestock/delete", method = POST)
    @ResponseBody
    public boolean deleteLivestock(@RequestBody Map<String, Object> map) {
        int tagIDToDelete = (int) map.get("tagID");
        return system.deleteLivestock(tagIDToDelete);
    }

    /**
     * Handles Update Livestock Requests
      */
    @RequestMapping(value = "livestock/update", method = POST)
    @ResponseBody
    public boolean updateLivestock(@RequestBody Map<String, Object> map) {
        LivestockModel model = LivestockModel.fromJSON(new JSONObject(map));
        return system.updateLivestock(model);
    }




    /**
     * General Selection Query
     * Sample Request Format: {
     *     "table":"LIVESTOCK_4",
     *     "columns": ["tagID", "age", "weight"]
     * }
     */
    @RequestMapping(value = "/get/values", method = POST)
    public void doSelection(@RequestBody Map<String, Object> map, HttpServletResponse res) throws IOException {
        ArrayList<String> columnsToSelect = (ArrayList<String>) map.get("columns");
        String tableToFrom = map.get("table").toString();

        JSONArray data = system.getSelect(columnsToSelect, tableToFrom);
        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(data);
        out.flush();
    }

    /**
     * Handles getVetRecords request for the livestock
     */
    @RequestMapping(value = "/get/vetRecords", method = POST)
    public void get_vet_records(@RequestBody Map<String, Object> map, HttpServletResponse res) throws IOException {
        int tag_to_find = (int) map.get("tagID");
        JSONArray livestock = system.getVetRecords(tag_to_find);

        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(livestock);
        out.flush();
    }

    /**
     * Gets the animal count for each animal type
     */
    @RequestMapping(value = "/get/animalCount", method = POST)
    public void getAnimalCountType(@RequestBody Map<String, Object> map, HttpServletResponse res) throws IOException {
        int filter_age = (int) map.get("tagID");
        JSONArray livestock = system.getAnimalCountType(filter_age);

        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(livestock);
        out.flush();
    }

    // For Ref!
    //    @RequestMapping(value = "/login", method = POST)
    //    public boolean login(HttpServletRequest req, HttpServletResponse res, Model model) throws IOException {
    //
    //    }
}
