package model.models.livestock;

import model.enums.AnimalType;
import model.enums.CropType;
import org.json.JSONObject;

import java.sql.Date;

public class Livestock_3_Model {

    private final AnimalType animalType;
    private final int age;
    private final boolean harvestable;

    public Livestock_3_Model(AnimalType animalType, int age,
                             boolean harvestable) {
        this.animalType = animalType;
        this.age = age;
        this.harvestable = harvestable;
    }


    public AnimalType getAnimalType() {
        return animalType;
    }

    public int getAge() {
        return age;
    }

    public boolean isHarvestable() {
        return harvestable;
    }


    public JSONObject toJSON() {
        JSONObject json = new JSONObject();
        json.put("animalType", animalType);
        json.put("age", age);
        json.put("harvestable", harvestable);
        return json;
    }

    public static Livestock_3_Model fromJSON(JSONObject json) {
        return new Livestock_3_Model(
                AnimalType.valueOf(json.getString("animalType").toUpperCase()),
                json.getInt("age"),
                json.getBoolean("harvestable")
        );
    }
}
