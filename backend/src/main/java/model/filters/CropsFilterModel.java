package model.filters;

import model.enums.CropStatus;
import model.enums.CropType;
import model.enums.CropVariant;

public class CropsFilterModel {

    private final CropType cropType;
    private final CropVariant cropVariant;
    private final CropStatus cropStatus;
    private final int minQuantity;
    private final int maxQuantity;

    public CropsFilterModel(CropType cropType, CropVariant cropVariant, CropStatus cropStatus, int minQuantity,
        int maxQuantity) {
        this.cropType = cropType;
        this.cropVariant = cropVariant;
        this.cropStatus = cropStatus;
        this.minQuantity = minQuantity;
        this.maxQuantity = maxQuantity;
    }

    /**
     *
     * @return something in the form of:
     * " WHERE (quantity >= minQuantity) AND (quantity <= maxQuantity)
     *      AND (cropType = cropType) AND (cropVariant = cropVariant) AND (cropStatus = cropStatus) "
     *
     */
    public String getQueryString() {
        String queryString = " WHERE ";

        // There will always be a min quantity and max quantity.


        if (minQuantity <= -1 && maxQuantity <= -1) {
            // no valid quantity val.
            queryString += " quantity >= " + 0 + " ";
        } else if (minQuantity > -1 && maxQuantity <= -1) {
            // valid min quantity val.
            queryString += " quantity >= " + minQuantity + " ";
        } else if (minQuantity <= -1 && maxQuantity > -1) {
            // valid max quantity val.
            queryString += " quantity <= " + maxQuantity + " ";
        } else {
            // both valid.
            queryString += " quantity >= " + minQuantity + " AND " + " quantity <= " + maxQuantity + " ";
        }

        if (getCropType() != CropType.ALL) {
            queryString += " AND (cropType = '" + cropType.toString().toLowerCase() + "') ";
        }

        if (getCropVariant() != CropVariant.ALL) {
            queryString += " AND (cropVariant = '" + cropVariant.toString().toLowerCase() + "') ";
        }

        if (getCropStatus() != CropStatus.ALL) {
            queryString += " AND (cropStatus = '" + cropStatus.toString().toLowerCase() + "') ";
        }

        return queryString;
    }

    public CropType getCropType() {
        return cropType;
    }

    public CropVariant getCropVariant() {
        return cropVariant;
    }

    public CropStatus getCropStatus() {
        return cropStatus;
    }

    public int getMinQuantity() {
        return minQuantity;
    }

    public int getMaxQuantity() {
        return maxQuantity;
    }

}
