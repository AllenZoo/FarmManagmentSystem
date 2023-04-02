package actions;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.enums.AnimalType;
import model.enums.CropType;
import model.filters.LivestockFilterModel;
import org.json.JSONArray;
import org.json.JSONObject;

import database.DatabaseConnectionHandler;
import model.LivestockModel;

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
    public boolean insertLivestock(LivestockModel model) {
        return dbHandler.insertLivestock(model);
    }

    /**
     * Update a livestock with given info
     */

    public boolean updateLivestock(LivestockModel model) {
        return dbHandler.updateLivestock(model);
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
}
