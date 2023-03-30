package model;

import model.enums.AnimalType;
import model.enums.CropType;

import java.sql.Date;

/**
 * The intent for this class is to update/store information about a single livestock
 */
public class LivestockModel {

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

}
