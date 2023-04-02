package model.filters;

import model.enums.AnimalType;
import model.enums.CropType;

public class LivestockFilterModel {

    private final String harvestable;
    private final AnimalType animalType;
    private final CropType diet;
    private final int minAge;
    private final int maxAge;

    public LivestockFilterModel(String harvestable, AnimalType animalType, CropType diet, int minAge, int maxAge) {
        this.harvestable = harvestable.toLowerCase();
        this.animalType = animalType;
        this.diet = diet;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

    /**
     *
     * @return something in the form of:
     * " WHERE (harvestable = 0/1)? AND (age >= minAge) AND (age <= maxAge) AND (animalType = AnimalType) AND (cropType = diet)
     *
     */
    public String getQueryString() {
        String queryString = " WHERE ";

        // There will always be a min age and max age.


        if (minAge <= -1 && maxAge <= -1) {
            // no valid age val.
            queryString += " age >= " + 0 + " ";
        } else if (minAge > -1 && maxAge <= -1) {
            // valid min age val.
            queryString += " age >= " + minAge + " ";
        } else if (minAge <= -1 && maxAge > -1) {
            // valid max age val.
            queryString += " age <= " + maxAge + " ";
        } else {
            // both valid.
            queryString += " age >= " + minAge + " AND " + " age <= " + maxAge + " ";

        }

        if (isHarvestable().equals("false")) {
            queryString += " AND (harvestable = " + 0 + " )  ";
        } else if (isHarvestable().equals("true")) {
            queryString += " AND (harvestable = " + 1 + " )  ";
        }

        if (getAnimalType() != AnimalType.ALL) {
            queryString += " AND (animalType = '" + animalType.toString().toLowerCase() + "') ";
        }

        if (getDiet() != CropType.ALL) {
            queryString += " AND (diet = '" + diet.toString().toLowerCase() + "') ";
        }

        return queryString;
    }

    public String isHarvestable() {
        return harvestable;
    }

    public AnimalType getAnimalType() {
        return animalType;
    }

    public CropType getDiet() {
        return diet;
    }

    public int getMinAge() {
        return minAge;
    }

    public int getMaxAge() {
        return maxAge;
    }

}
