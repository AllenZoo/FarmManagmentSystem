package model.models;

/**
 * The intent for this class is to update/store information about a single farmer
 */
public class FarmerModel {
    private final int farmerID;
    private final String fullName;
    private final int yearsOfEmployment;
    private final int salary;

    public FarmerModel(int farmerID, String fullName, int yearsOfEmployment, int salary) {
        this.farmerID = farmerID;
        this.fullName = fullName;
        this.yearsOfEmployment = yearsOfEmployment;
        this.salary = salary;
    }

    public int getFarmerID() {
        return farmerID;
    }

    public String getFullName() {
        return fullName;
    }

    public int getYearsOfEmployment() {
        return yearsOfEmployment;
    }

    public int getSalary() {
        return salary;
    }
}
