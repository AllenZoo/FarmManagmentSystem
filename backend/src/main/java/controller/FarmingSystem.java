package controller;

import org.json.JSONArray;
import org.json.JSONObject;

import database.DatabaseConnectionHandler;
import model.LivestockModel;

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
        return dbHandler.getLivestock();
    }

    /**
     * Insert a livestock given info
     */
    public boolean insertLivestock(LivestockModel model) {
        return dbHandler.insertLivestock(model);
    }
}
