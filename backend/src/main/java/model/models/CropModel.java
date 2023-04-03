package model.models;

import model.enums.CropStatus;
import model.enums.CropType;
import model.enums.CropVariant;

/**
 * The intent for this class is to update/store information about a single crop
 */
public class CropModel {
    private final CropType cropType;
    private final CropVariant cropVariant;
    private final CropStatus cropStatus;
    private final int quantity;

    public CropModel(CropType cropType, CropVariant cropVariant,
                     CropStatus cropStatus, int quantity) {
        this.cropType = cropType;
        this.cropVariant = cropVariant;
        this.cropStatus = cropStatus;
        this.quantity = quantity;
    }

    public CropType getCropType() {
        return cropType;
    }

    public CropVariant getVariant() {
        return cropVariant;
    }

    public CropStatus getCropStatus() {
        return cropStatus;
    }

    public int getQuantity() {
        return quantity;
    }

}
