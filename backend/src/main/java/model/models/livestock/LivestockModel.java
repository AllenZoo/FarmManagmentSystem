package model.models.livestock;

import model.enums.AnimalType;
import model.enums.CropType;

import java.sql.Date;

import org.json.JSONObject;

/**
 * The intent for this class is to update/store information about a single livestock
 */
public class  LivestockModel {

    private final int tagID;
    private final AnimalType animalType;
    private final int age;
    private final CropType diet;
    private final double weight;
    private final Date lastFed;
    private final boolean harvestable;
    private final Date lastViolatedForHarvestedGoods;

    public LivestockModel(int tagID, AnimalType animalType, int age, CropType diet,
                          double weight, Date lastFed, boolean harvestable,
                          Date lastViolatedForHarvestedGoods) {
        this.tagID = tagID;
        this.animalType = animalType;
        this.age = age;
        this.diet = diet;
        this.weight = weight;
        this.lastFed = lastFed;
        this.harvestable = harvestable;
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

    public CropType getDiet() {
        return diet;
    }

    public double getWeight() {
        return weight;
    }

    public Date getLastFed() {
        return lastFed;
    }

    public boolean isHarvestable() {
        return harvestable;
    }

    public Date getLastViolatedForHarvestedGoods() {
        return lastViolatedForHarvestedGoods;
    }

    public JSONObject toJSON() {
        JSONObject json = new JSONObject();
        json.put("tagID", tagID);
        json.put("animalType", animalType);
        json.put("age", age);
        json.put("diet", diet);
        json.put("weight", weight);
        json.put("lastFed", lastFed);
        json.put("harvestable", harvestable);
        json.put("lastViolatedForHarvestedGoods", lastViolatedForHarvestedGoods);
        return json;
    }

    public static LivestockModel fromJSON(JSONObject json) {
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

        return new LivestockModel(
                json.getInt("tagID"),
                AnimalType.valueOf(json.getString("animalType").toUpperCase()),
                json.getInt("age"),
                CropType.valueOf(json.getString("diet").toUpperCase()),
                json.getDouble("weight"),
                lastFed,
                json.getBoolean("harvestable"),
                lastViolatedForHarvestedGoods
        );
    }
}