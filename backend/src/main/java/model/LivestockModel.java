package model;

import model.enums.AnimalType;
import model.enums.CropType;

public class LivestockModel {

    private final int tagID;
    private final AnimalType animalType;
    private final int age;
    private final CropType diet;
    private final double weight;
    private final String date;
    private final boolean harvestable;

    public LivestockModel(int tagID, AnimalType animalType, int age, CropType diet,
                          double weight, String date, boolean harvestable) {
        this.tagID = tagID;
        this.animalType = animalType;
        this.age = age;
        this.diet = diet;
        this.weight = weight;
        this.date = date;
        this.harvestable = harvestable;
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

    public String getDate() {
        return date;
    }

    public boolean isHarvestable() {
        return harvestable;
    }
}
