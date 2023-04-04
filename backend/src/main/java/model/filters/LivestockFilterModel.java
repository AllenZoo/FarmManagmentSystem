package model.filters;

import model.enums.AnimalType;
import model.enums.CropType;

public class LivestockFilterModel {

    private final String harvestable;
    private final AnimalType animalType;
    private final CropType diet;
    private final int minAge;
    private final int maxAge;
    private final int minTagID;
    private final int maxTagID;
    private final int minWaterSpent;
    private final int minFoodSpent;

    public LivestockFilterModel(String harvestable, AnimalType animalType, CropType diet, int minAge, int maxAge,
                                int minTagID, int maxTagID, int minWaterSpent, int minFoodSpent) {
        this.harvestable = harvestable.toLowerCase();
        this.animalType = animalType;
        this.diet = diet;
        this.minAge = minAge;
        this.maxAge = maxAge;
        this.minTagID = minTagID;
        this.maxTagID = maxTagID;
        this.minWaterSpent = minWaterSpent;
        this.minFoodSpent = minFoodSpent;
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

        // There will always be a min tag id and max tag id.
        if (minTagID <= 4000 && maxTagID >= 4999) {
            // no valid tag id val.
            queryString += " AND tagID >= " + 4000 + " ";
        } else if (minTagID > 4000 && maxTagID >= 4999) {
            // valid min tag id val.
            queryString += " AND tagID >= " + minTagID + " ";
        } else if (minTagID <= 4000 && maxTagID < 4999) {
            // valid max tag id val.
            queryString += " AND tagID <= " + maxTagID + " ";
        } else {
            // both valid.
            queryString += " AND tagID >= " + minTagID + " AND " + " tagID <= " + maxTagID + " ";
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

    /**
     *
     * @return something in the form of:
     * " HAVING SUM(waterSpent) >= minWaterSpent AND SUM(foodSpent) >= minFoodSpent
     */
    public String getHavingFilter() {
        String query = " HAVING ";

        if (minWaterSpent <= -1 && minFoodSpent <= -1) {
            // no having query required.
            query += " SUM(waterSpent) >= 0";
        } else if (minWaterSpent > -1 && minFoodSpent <= -1) {
            // minWaterSpent valid
            query += " SUM(waterSpent) >= " + minWaterSpent + " ";

        } else if (minWaterSpent <= -1 && minFoodSpent > -1) {
            // minFoodSpent valid
            query += " SUM(foodSpent) >= " + minFoodSpent + " ";
        } else {
            // both valid
            query += " SUM(waterSpent) >= " + minWaterSpent + " " + "AND" + " SUM(foodSpent) >= " + minFoodSpent + " ";
        }

        return query;
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

    public int getMinTagID() {
        return minTagID;
    }

    public int getMaxTagID() {
        return maxTagID;
    }

}
