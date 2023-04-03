package model.models.crop;

import model.enums.CropStatus;
import model.enums.CropType;
import model.enums.CropVariant;

import org.json.JSONObject;

/**
 * The intent for this class is to update/store information about a single livestock
 */
public class  CropModel {

    private final CropType cropType;
    private final CropVariant cropVariant;
    private final CropStatus cropStatus;
    private final int quantity;

    public CropModel(CropType cropType, CropVariant cropVariant, CropStatus cropStatus, int quantity) {
        this.cropType = cropType;
        this.cropVariant = cropVariant;
        this.cropStatus = cropStatus;
        this.quantity = quantity;
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

    public int getQuantity() {
        return quantity;
    }

    public JSONObject toJSON() {
        JSONObject json = new JSONObject();
        json.put("cropType", cropType.toString().toUpperCase());
        json.put("cropVariant", cropVariant.toString().toUpperCase());
        json.put("cropStatus", cropStatus.toString().toUpperCase());
        json.put("quantity", quantity);
        return json;
    }

    public static CropModel fromJSON(JSONObject json) {
        return new CropModel(
            CropType.valueOf(json.getString("cropType").toUpperCase()),
            CropVariant.valueOf(json.getString("cropVariant").toUpperCase()),
            CropStatus.valueOf(json.getString("cropStatus").toUpperCase()),
            json.getInt("quantity")
        );
    }
}
