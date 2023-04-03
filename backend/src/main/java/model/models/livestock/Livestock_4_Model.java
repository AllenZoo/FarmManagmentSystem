package model.models.livestock;

import model.enums.AnimalType;

import java.sql.Date;

import org.json.JSONObject;

/**
 * The intent for this class is to update/store information about a single livestock
 */
public class Livestock_4_Model {

    private final int tagID;
    private final AnimalType animalType;
    private final int age;
    private final double weight;
    private final Date lastFed;
    private final Date lastViolatedForHarvestedGoods;

    public Livestock_4_Model(int tagID, AnimalType animalType, int age,
                             double weight, Date lastFed,
                             Date lastViolatedForHarvestedGoods) {
        this.tagID = tagID;
        this.animalType = animalType;
        this.age = age;
        this.weight = weight;
        this.lastFed = lastFed;
        this.lastViolatedForHarvestedGoods = lastViolatedForHarvestedGoods;
    }

    public int getTagID() {
        return tagID;
    }

    public AnimalType getAnimalType() {
        return animalType;
    }

    public int getAge() {
        return age;
    }

    public double getWeight() {
        return weight;
    }

    public Date getLastFed() {
        return lastFed;
    }

    public Date getLastViolatedForHarvestedGoods() {
        return lastViolatedForHarvestedGoods;
    }

    public JSONObject toJSON() {
        JSONObject json = new JSONObject();
        json.put("tagID", tagID);
        json.put("animalType", animalType);
        json.put("age", age);
        json.put("weight", weight);
        json.put("lastFed", lastFed);
        json.put("lastViolatedForHarvestedGoods", lastViolatedForHarvestedGoods);
        return json;
    }

    public static Livestock_4_Model fromJSON(JSONObject json) {
        Date lastFed;
        try {
          lastFed = Date.valueOf(json.getString("lastFed"));
        } catch (Exception e) {
          lastFed = null;
        }

        Date lastViolatedForHarvestedGoods;
        try {
          lastViolatedForHarvestedGoods = Date.valueOf(json.getString("lastViolatedForHarvestedGoods"));
        } catch (Exception e) {
          lastViolatedForHarvestedGoods = null;
        }

        return new Livestock_4_Model(
                json.getInt("tagID"),
                AnimalType.valueOf(json.getString("animalType").toUpperCase()),
                json.getInt("age"),
                json.getDouble("weight"),
                lastFed,
                lastViolatedForHarvestedGoods
              );
    }
}
