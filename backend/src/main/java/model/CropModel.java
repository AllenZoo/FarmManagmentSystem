package model;

import model.enums.CropStatusType;
import model.enums.CropType;
import model.enums.CropVariantType;

public class CropModel {
    private final CropType cropType;
    private final CropVariantType variant;
    private final CropStatusType plantStatus;
    private final int quantity;

    public CropModel(CropType cropType, CropVariantType variant,
                     CropStatusType plantStatus, int quantity) {
        this.cropType = cropType;
        this.variant = variant;
        this.plantStatus = plantStatus;
        this.quantity = quantity;
    }

    public CropType getCropType() {
        return cropType;
    }

    public CropVariantType getVariant() {
        return variant;
    }

    public CropStatusType getPlantStatus() {
        return plantStatus;
    }

    public int getQuantity() {
        return quantity;
    }

}
