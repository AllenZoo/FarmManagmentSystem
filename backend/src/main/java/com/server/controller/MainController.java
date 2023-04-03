package com.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.models.livestock.Livestock_4_Model;
import model.enums.ActionType;
import model.enums.AnimalType;
import model.enums.CropType;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import actions.FarmingSystem;

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

    public MainController() {
        system = new FarmingSystem();
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
        String harvestable = (map.get("harvestable").toString().toUpperCase());
        AnimalType animalType = AnimalType.valueOf(map.get("animalType").toString().toUpperCase());
        CropType diet = CropType.valueOf(map.get("diet").toString().toUpperCase());

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
        Livestock_4_Model model = Livestock_4_Model.fromJSON(new JSONObject(map));
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
        Livestock_4_Model model = Livestock_4_Model.fromJSON(new JSONObject(map.get("livestock").toString()));
        ActionType actionType = ActionType.valueOf(map.get("actionType").toString().toUpperCase());
        return system.updateLivestock(model, actionType);
    }


    /**
     * Handles getVetRecords request for the livestock
     */
    @RequestMapping(value = "/get/vetRecords", method = POST)
    public void getVetRecords(@RequestBody Map<String, Object> map, HttpServletResponse res) throws IOException {
        int tag_to_find = Integer.parseInt(map.get("tagID").toString());
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
    @RequestMapping(value = "/livestock/get/animalCount", method = GET)
    public void getAnimalCountType(HttpServletResponse res) throws IOException {
        JSONArray livestock = system.getAnimalCountType();

        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(livestock);
        out.flush();
    }

    /**
     * Gets the animal count for each animal type filtered by age
     */
    @RequestMapping(value = "/livestock/get/animalCountByAge", method = POST)
    public void getAnimalCountTypeByAge(@RequestBody Map<String, Object> map, HttpServletResponse res) throws IOException {
        int filter_age = (int) map.get("tagID");
        JSONArray livestock = system.getAnimalCountTypeByAge(filter_age);

        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(livestock);
        out.flush();
    }


    /**
     * Does aggregation with group by - Provides animals who have drank and eaten the most food
     */
    @RequestMapping(value = "/get/wateredAndFed", method = POST)
    public void getWateredAndFed(@RequestBody Map<String, Object> map, HttpServletResponse res) throws IOException {
        AnimalType animalType = AnimalType.valueOf(map.get("animalType").toString().toUpperCase());
        int water_spent = (int) map.get("waterSpent");
        int food_spent = (int) map.get("foodSpent");
        JSONArray livestock = system.getWateredAndFed(animalType, water_spent, food_spent);

        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(livestock);
        out.flush();
    }


    @RequestMapping(value = "/get/usertables", method = GET)
    public void getUserTables(HttpServletRequest req, HttpServletResponse res) throws IOException {
        JSONArray tables = system.getUserTables();
        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(tables);
        out.flush();
    }

    @RequestMapping(value = "/get/tablecolumns", method = POST)
    public void getTableColumns(@RequestBody Map<String, Object> map, HttpServletResponse res) throws IOException {
        JSONArray tables = system.getTableColumns(map.get("table_name").toString());
        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(tables);
        out.flush();
    }

    /**
     * General PROJECTION Query
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
     * Does nested aggregation
     */
    @RequestMapping(value = "/get/overweight", method = GET)
    public void getOverweightAnimals(HttpServletResponse res) throws IOException {
        JSONArray data = system.findOverweightAnimals();

        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(data);
        out.flush();
    }

    /**
     * Does division
     *
     * if:
     * type = 1 -> get all farmers who have nurtured all livestock
     * otherwise -> get all farmers who have tended all fields
     *
     * RECEIVES:
     * {
     *     param: 1 OR 2
     * }
     *
     */
    @RequestMapping(value = "/get/farmerDiv", method = POST)
    public void getAllFarmersDivision(@RequestBody Map<String, Object> map, HttpServletResponse res) throws IOException {
        JSONArray data = system.findAllFarmerDivision((int) map.get("param"));
        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        out.print(data);
        out.flush();
    }
      // For Ref!
    //    @RequestMapping(value = "/login", method = POST)
    //    public boolean login(HttpServletRequest req, HttpServletResponse res, Model model) throws IOException {
    //
    //    }
}
