package model.models.livestock;

import model.enums.AnimalType;
import model.enums.CropType;
import org.json.JSONObject;

public class Livestock_1_Model {
    private final AnimalType animalType;
    private final CropType diet;
    private final double weight;


    public Livestock_1_Model(AnimalType animalType, CropType diet,
                             double weight) {
        this.animalType = animalType;
        this.diet = diet;
        this.weight = weight;
    }

    public AnimalType getAnimalType() {
        return animalType;
    }

    public CropType getDiet() {
        return diet;
    }

    public double getWeight() {
        return weight;
    }

    public JSONObject toJSON() {
        JSONObject json = new JSONObject();
        json.put("animalType", animalType);
        json.put("diet", diet);
        json.put("weight", weight);
        return json;
    }

    public static Livestock_1_Model fromJSON(JSONObject json) {
        return new Livestock_1_Model(
                AnimalType.valueOf(json.getString("animalType").toUpperCase()),
                CropType.valueOf(json.getString("diet").toUpperCase()),
                json.getDouble("weight")
        );
    }
}
