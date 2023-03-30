package model;

import model.enums.CropType;
import model.enums.FieldState;

public class FieldModel {

    private final int plotNum;
    private final double nutrientLevels;
    private final CropType suitableCrops;
    private final int capacity;
    private final FieldState fieldState;
    private final boolean needPesticides;


    public FieldModel(int plotNum, double nutrientLevels, CropType suitableCrops,
                      int capacity, FieldState fieldState, boolean needPesticides) {
        this.plotNum = plotNum;
        this.nutrientLevels = nutrientLevels;
        this.suitableCrops = suitableCrops;
        this.capacity = capacity;
        this.fieldState = fieldState;
        this.needPesticides = needPesticides;
    }

    public int getPlotNum() {
        return plotNum;
    }

    public double getNutrientLevels() {
        return nutrientLevels;
    }

    public CropType getSuitableCrops() {
        return suitableCrops;
    }

    public int getCapacity() {
        return capacity;
    }

    public FieldState getFieldState() {
        return fieldState;
    }

    public boolean isNeedPesticides() {
        return needPesticides;
    }

}
