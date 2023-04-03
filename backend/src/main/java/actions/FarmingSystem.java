package actions;

import jakarta.servlet.http.HttpServletRequest;
import model.enums.ActionType;
import model.enums.AnimalType;
import model.enums.CropType;
import model.filters.LivestockFilterModel;
import org.json.JSONArray;
import org.json.JSONObject;

import database.DatabaseConnectionHandler;
import model.models.livestock.Livestock_4_Model;

import java.util.ArrayList;

public class FarmingSystem {

    private DatabaseConnectionHandler dbHandler = null;

    public FarmingSystem() {
        dbHandler = new DatabaseConnectionHandler();
    }

    /**
     * LoginWindowDelegate Implementation
     *
     * connects to Oracle database with supplied username and password
     */
    public boolean login(String username, String password) {
        boolean didConnect = dbHandler.login(username, password);
        return didConnect;
    }
    public boolean logout() {
        try {
            dbHandler.close();
            dbHandler = null;
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    /**
     * Retrieves all livestock data from database
     * 
     * TODO: overload this method to allow for filtering
     */
    public JSONArray getLivestock() {
        ArrayList<JSONObject> livestock = dbHandler.getLivestock();
        JSONArray livestockArray = new JSONArray(livestock);
        return livestockArray;
    }

    public JSONArray getLivestock(HttpServletRequest req) {
        ArrayList<JSONObject> livestock = dbHandler.getLivestock();
        JSONArray livestockArray = new JSONArray(livestock);
        return livestockArray;
    }

    public JSONArray getFilteredLivestock(String harvestable, AnimalType animalType, CropType diet, int minAge, int maxAge) {
        LivestockFilterModel model = new LivestockFilterModel(harvestable, animalType, diet, minAge, maxAge);

        ArrayList<JSONObject> livestock =         dbHandler.getFilteredLivestock(model);
        JSONArray livestockArray = new JSONArray(livestock);
        return livestockArray;
    }

    public boolean deleteLivestock(int tagID) {
        return dbHandler.deleteLivestock(tagID);
    }

    /**
     * Insert a livestock given info
     */
    public boolean insertLivestock(Livestock_4_Model model) {
        return dbHandler.insertLivestock(model);
    }

    /**
     * Update a livestock with given info
     */

    public boolean updateLivestock(Livestock_4_Model model, ActionType actionType) {
        return dbHandler.updateLivestock(model, actionType);
    }



    // ================= GENERAL PROJECT ===================

    /**
     * General Select from any table request
     */
    public JSONArray getSelect(ArrayList<String> columns, String tableName) {
        ArrayList<JSONObject> data = dbHandler.projectTable(tableName, columns);
        JSONArray dataJSONArray = new JSONArray(data);
        return dataJSONArray;
    }


    /**
     * Join query with vet records
     */
    public JSONArray getVetRecords(int id) {
        ArrayList<JSONObject> data = dbHandler.findLivestockHealthStatus(id);
        JSONArray dataArray = new JSONArray(data);
        return dataArray;
    }

    /**
     * Aggregation with group by -> count animal types
     */
    public JSONArray getAnimalCountType(int age) {
        ArrayList<JSONObject> data = dbHandler.findCountedTypesSold(age);
        JSONArray dataArray = new JSONArray(data);
        return dataArray;
    }

    /**
     * Aggregation with having
     */
    public JSONArray getWateredAndFed(AnimalType animal, int water, int food) {
        ArrayList<JSONObject> data = dbHandler.findWateredAndFed(animal, water, food);
        JSONArray dataArray = new JSONArray(data);
        return dataArray;
    }


    /**
     * Projection Functions
     */
    public JSONArray getUserTables() {
        ArrayList<String> tables = dbHandler.getUserTables();
        JSONArray tablesJSONArray = new JSONArray(tables);
        return tablesJSONArray;
    }

    public JSONArray getTableColumns(String tableName) {
        ArrayList<String> columns = dbHandler.getTableColumns(tableName);
        JSONArray columnsJSONArray = new JSONArray(columns);
        return columnsJSONArray;
    }

    /**
     * Nested aggregation
     */
    public JSONArray findOverweightAnimals() {
        ArrayList<JSONObject> data = dbHandler.findOverweightAnimals();
        JSONArray dataArray = new JSONArray(data);
        return dataArray;
    }

    /**
     * Division query
     */
    public JSONArray findAllFarmerDivision(int param) {
        ArrayList<JSONObject> data = dbHandler.findAllFarmersDivision(param);
        JSONArray dataArray = new JSONArray(data);
        return  dataArray;
    }
}
