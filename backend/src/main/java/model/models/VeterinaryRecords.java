package model.models;

import model.enums.HealthStatus;
import oracle.sql.DATE;

public class VeterinaryRecords {

    private final int tagID;

    private final int recordID;

    private final DATE date;

    private final HealthStatus status;


    public VeterinaryRecords(int tagID, int recordID, DATE date, HealthStatus status) {
        this.tagID = tagID;
        this.recordID = recordID;
        this.date = date;
        this.status = status;
    }


    private int getTagID() {
        return tagID;
    }

    public int getRecordID() {
        return recordID;
    }

    public DATE getDate() {
        return date;
    }

    public HealthStatus getStatus() {
        return status;
    }
}
