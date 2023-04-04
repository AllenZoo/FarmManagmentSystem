package database;

import java.sql.*;
import java.util.ArrayList;
import java.util.Random;

import model.filters.CropsFilterModel;
import model.filters.LivestockFilterModel;
import model.models.livestock.LivestockModel;
import model.models.livestock.Livestock_1_Model;
import model.models.livestock.Livestock_3_Model;
import org.json.JSONObject;

import model.enums.ActionType;
import model.enums.AnimalType;
import model.enums.CropStatus;
import model.enums.CropType;
import model.enums.CropVariant;
import model.models.BranchModel;
import model.models.crop.CropModel;
import model.models.livestock.Livestock_4_Model;
import util.PrintablePreparedStatement;

/**
 * This class handles all database related transactions
 */
public class DatabaseConnectionHandler {
	// Use this version of the ORACLE_URL if you are running the code off of the server
	// private static final String ORACLE_URL = "jdbc:oracle:thin:@dbhost.students.cs.ubc.ca:1522:stu";
	// Use this version of the ORACLE_URL if you are tunneling into the undergrad servers

	private static final String ORACLE_URL = "jdbc:oracle:thin:@localhost:1522:stu";
	// private static final String ORACLE_URL = "jdbc:oracle:thin:@dbhost.students.cs.ubc.ca:1522:stu";
	private static final String EXCEPTION_TAG = "[EXCEPTION]";
	private static final String WARNING_TAG = "[WARNING]";

	private Connection connection = null;

	public DatabaseConnectionHandler() {
		try {
			// Load the Oracle JDBC driver
			// Note that the path could change for new drivers
			DriverManager.registerDriver(new oracle.jdbc.driver.OracleDriver());
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
	}

	public void close() {
		try {
			if (connection != null) {
				connection.close();
			}
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
	}

	public boolean login(String username, String password) {
		try {
			if (connection != null) {
				connection.close();
			}

			connection = DriverManager.getConnection(ORACLE_URL, username, password);
			connection.setAutoCommit(false);
			// populateLivestock();

			System.out.println("\nConnected to Oracle!");
			return true;
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
			return false;
		}
	}

  /* -------------------------------------------------------------------------- */
  /*                                CROPS METHODS                               */
  /* -------------------------------------------------------------------------- */
  public ArrayList<JSONObject> getCrops() {
    ArrayList<JSONObject> crops = new ArrayList<JSONObject>();

    try {
      String query = "SELECT * FROM CROPS";
      PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
      ResultSet rs = ps.executeQuery();

      while (rs.next()) {
        CropModel model = new CropModel(
            CropType.valueOf(rs.getString("cropType").toUpperCase()),
            CropVariant.valueOf(rs.getString("cropVariant").toUpperCase()),
            CropStatus.valueOf(rs.getString("cropStatus").toUpperCase()),
            rs.getInt("quantity"));
        crops.add(model.toJSON());
      }

      rs.close();
      ps.close();
    } catch (SQLException e) {
      System.out.println(EXCEPTION_TAG + " " + e.getMessage());
    }

    // System.out.println(crops);
    return crops;
  }

  // SELECTION QUERY
  public ArrayList<JSONObject> getFilteredCrops(CropsFilterModel model) {
    ArrayList<JSONObject> crops = new ArrayList<JSONObject>();

    try {
      String subquery = "SELECT * FROM CROPS";
      String query = "SELECT * FROM (" + subquery + ") " + model.getQueryString();

      PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
      ResultSet rs = ps.executeQuery();

      while (rs.next()) {
        CropModel tempModel = new CropModel(
            CropType.valueOf(rs.getString("cropType").toUpperCase()),
            CropVariant.valueOf(rs.getString("cropVariant").toUpperCase()),
            CropStatus.valueOf(rs.getString("cropStatus").toUpperCase()),
            rs.getInt("quantity"));
        crops.add(tempModel.toJSON());
      }

      rs.close();
      ps.close();
    } catch (SQLException e) {
      System.out.println(EXCEPTION_TAG + " " + e.getMessage());
    }

    // System.out.println(crops);
    return crops;
  }


	/* -------------------------------------------------------------------------- */
	/*                              LIVESTOCK METHODS                             */
	/* -------------------------------------------------------------------------- */
  public ArrayList<JSONObject> getLivestock() {
    ArrayList<JSONObject> livestock = new ArrayList<JSONObject>();

    try {
      String query =
          "SELECT  l4.tagID AS tagID, " +
              "l4.animalType AS animalType, " +
              "l4.age AS age, " +
              "l1.diet AS diet, " +
              "l4.weight AS weight, " +
              "l4.lastFed AS lastFed, " +
              "l3.harvestable AS harvestable," +
              "l4.lastViolatedForHarvestedGoods AS lastViolatedForHarvestedGoods " +
          "FROM LIVESTOCK_1 l1, LIVESTOCK_3 l3, LIVESTOCK_4 l4 " +
          "WHERE l4.animalType = l3.animalType " +
          "AND   l4.animalType = l1.animalType " +
          "AND   l4.age        = l3.age        " +
          "AND   l4.weight     = l1.weight     ";

      PrintablePreparedStatement ps =
          new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
      ResultSet rs = ps.executeQuery();

      while(rs.next()) {
        LivestockModel model = new LivestockModel(
            rs.getInt("tagID"),
            AnimalType.valueOf(rs.getString("animalType").toUpperCase()),
            rs.getInt("age"),
            CropType.valueOf(rs.getString("diet").toUpperCase()),
            rs.getDouble("weight"),
            rs.getDate("lastFed"),
            rs.getBoolean("harvestable"),
            rs.getDate("lastViolatedForHarvestedGoods"));
        livestock.add(model.toJSON());
      }

      rs.close();
      ps.close();
    } catch (SQLException e) {
      System.out.println(EXCEPTION_TAG + " " + e.getMessage());
    }

    // System.out.println(livestock);
    return livestock;
  }

  // INSERT QUERY
	public boolean insertLivestock(LivestockModel model) {
		try {
			Livestock_1_Model model1 = new Livestock_1_Model(model.getAnimalType(), model.getDiet(), model.getWeight());
			Livestock_3_Model model3 = new Livestock_3_Model(model.getAnimalType(), model.getAge(), model.isHarvestable());
			insertLivestock_3(model3);
			insertLivestock_1(model1);

			String query = "INSERT INTO Livestock_4(tagID, animalType, age,  weight, lastFed, " +
					"lastViolatedForHarvestedGoods) " +
					"VALUES (?, ?, ?, ?, ?, ?)";
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setInt(1, model.getTagID());
			ps.setString(2, model.getAnimalType().toString().toLowerCase());
			ps.setInt(3, model.getAge());
			ps.setDouble(4, model.getWeight());
			ps.setDate(5, model.getLastFed());
			ps.setDate(6, model.getLastViolatedForHarvestedGoods());

			// TODO: might need to check for empty vals and do the following as ref:
			//	if (model.getPhoneNumber() == 0) {
			//		ps.setNull(5, java.sql.Types.INTEGER);
			//	} else {
			//		ps.setInt(5, model.getPhoneNumber());
			//	}



			ps.executeUpdate();
			connection.commit();

			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
			rollbackConnection();
			return false;
		}
		// Succesfully inserted without errors
		return true;
	}

	// DELETE QUERY
	public boolean deleteLivestock(int tagID) {
		try {
			// Delete livestock
			String query = "DELETE FROM Livestock_4 WHERE tagID = ?";
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setInt(1, tagID);
			int rowCount = ps.executeUpdate();
			if (rowCount == 0) {
				System.out.println(WARNING_TAG + " Animal with TagID " + tagID + " does not exist!");
			}
			connection.commit();

			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
			rollbackConnection();
			return false;
		}
		return true;
	}

	// UPDATE QUERY
	public boolean updateLivestock(Livestock_4_Model model, ActionType actionType) {
    String query;
    PrintablePreparedStatement ps;

		try {
      switch (actionType) {
        case FEED:
          query = "UPDATE Livestock_4 SET lastFed = ? " +
              "WHERE tagID = ? OR (tagID = ? AND lastFed IS NULL)";
          ps = new PrintablePreparedStatement(connection.prepareStatement(query), query,
              false);
          ps.setDate(1, new Date(System.currentTimeMillis()));
          ps.setInt(2, model.getTagID());
          ps.setInt(3, model.getTagID());
          ps.executeUpdate();
          break;
        case HARVEST:
          query = "UPDATE Livestock_4 SET lastViolatedForHarvestedGoods = ? " +
              "WHERE tagID = ? OR (tagID = ? AND lastViolatedForHarvestedGoods IS NULL)";
          ps = new PrintablePreparedStatement(connection.prepareStatement(query), query,
              false);
          ps.setDate(1, new Date(System.currentTimeMillis()));
          ps.setInt(2, model.getTagID());
          ps.setInt(3, model.getTagID());
          ps.executeUpdate();
          break;
        default:
          System.out.println(WARNING_TAG + " Invalid action type!");
          rollbackConnection();
          return false;
      }

      // String query = "UPDATE Livestock_4 SET tagID = ?," +
      //     "animalType = ?," +
      //     "age = ?," +
      //     "weight = ?," +
      //     "lastFed = ?," +
      //     "lastViolatedForHarvestedGoods = ?," +
      //     "WHERE tagID = ?";
      // PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
      // ps.setInt(1, model.getTagID());
      // ps.setString(2, model.getAnimalType().toString().toLowerCase());
      // ps.setInt(3, model.getAge());
      // ps.setDouble(4, model.getWeight());
      // ps.setDate(5, model.getLastFed());
      // ps.setDate(6, model.getLastViolatedForHarvestedGoods());
      // ps.setInt(7, model.getTagID());
      // ps.executeUpdate();

			connection.commit();
			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
			rollbackConnection();
			return false;
		}

		return true;
	}

	// SELECTION QUERY
	public ArrayList<JSONObject> getFilteredLivestock(LivestockFilterModel model) {
		ArrayList<JSONObject> livestock = new ArrayList<JSONObject>();

		try {
			String subquery = "SELECT  l4.tagID AS tagID, " +
					"l4.animalType AS animalType, " +
					"l4.age AS age, " +
					"l1.diet AS diet, " +
					"l4.weight AS weight, " +
					"l4.lastFed AS lastFed, " +
					"l3.harvestable AS harvestable," +
					"l4.lastViolatedForHarvestedGoods AS lastViolatedForHarvestedGoods " +
					"FROM LIVESTOCK_1 l1, LIVESTOCK_3 l3, LIVESTOCK_4 l4 " +
					"WHERE l4.animalType = l3.animalType " +
					"AND   l4.animalType = l1.animalType " +
					"AND   l4.age        = l3.age        " +
					"AND   l4.weight     = l1.weight     ";
			String query = "SELECT * FROM (" + subquery + ") " + model.getQueryString();

			PrintablePreparedStatement ps =
					new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ResultSet rs = ps.executeQuery();

			while(rs.next()) {
				LivestockModel tempModel = new LivestockModel(
						rs.getInt("tagID"),
						AnimalType.valueOf(rs.getString("animalType").toUpperCase()),
						rs.getInt("age"),
						CropType.valueOf(rs.getString("diet").toUpperCase()),
						rs.getDouble("weight"),
						rs.getDate("lastFed"),
						rs.getBoolean("harvestable"),
						rs.getDate("lastViolatedForHarvestedGoods"));
				livestock.add(tempModel.toJSON());
			}

			rs.close();
			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}

		// System.out.println(livestock);
		return livestock;
	}

	// SELECTION Query
	// Finds the animals that are ready to sell with user specified weight
	// TODO: Figure out what needs to be passed into this function for weight
	public ArrayList<JSONObject> findAnimalToSell(Livestock_4_Model model) {
		ArrayList<JSONObject> livestock = new ArrayList<JSONObject>();
		try {
			String query = "SELECT tagID FROM Livestock_4 L4 WHERE L4.age > (SELECT MIN(age) " +
					"FROM Livestock_3 WHERE harvestable = TRUE) AND weight = ?";
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setDouble(1, model.getWeight());

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				int tag_to_add = rs.getInt("tagID");
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("tagID", tag_to_add);
				livestock.add(jsonObject);
			}

			ps.close();
			rs.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
			rollbackConnection();
			return null;
		}
		return livestock;
	}

	// PROJECTION QUERY
	public ArrayList<JSONObject> projectTable(String relation_name, ArrayList<String> columns) {
		ArrayList<JSONObject> to_return = new ArrayList<JSONObject>();
		try {
			String columnsString = "";
			for (int i = 0; i < columns.size(); i++) {
				if (i != columns.size() - 1) {
					columnsString += columns.get(i) + ", ";
				} else {
					columnsString += columns.get(i);
				}

			}
			String query = "SELECT DISTINCT " + columnsString + " FROM " + relation_name;
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);

			ResultSet rs = ps.executeQuery();


			while(rs.next()) {
				JSONObject json = new JSONObject();
				for (int i = 0; i < columns.size();  i++) {
					// System.out.println(rs.getObject(columns.get(i)));
					json.put(columns.get(i), rs.getObject(columns.get(i)));
				}
				to_return.add(json);
			}

			rs.close();
			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
		return to_return;
	}

	// JOIN QUERY
	// Finds the health status of the animal with tagID specified by user
	public ArrayList<JSONObject> findLivestockHealthStatus(int id) {
		ArrayList<JSONObject> livestock = new ArrayList<JSONObject>();
		try {
			String query = "SELECT * FROM Livestock_4 L4, " +
					"VeterinaryRecords_Has VR WHERE VR.tagID = L4.tagID and L4.tagID = ?";

			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setInt(1, id);

			ResultSet rs = ps.executeQuery();

			while(rs.next()) {
				int tag_to_add = rs.getInt("tagID");
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("tagID", tag_to_add);
				jsonObject.put("recordID", rs.getInt("recordID"));
				jsonObject.put("record_date", rs.getDate("record_date"));
				jsonObject.put("healthstatus", rs.getString("healthstatus"));
				livestock.add(jsonObject);
			}

			rs.close();
			ps.close();

		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
		return livestock;
	}

	// AGGREGATION WITH GROUP BY
	public ArrayList<JSONObject> findCountedTypesSold() {
		ArrayList<JSONObject> livestock = new ArrayList<JSONObject>();
		try {
			String query = "SELECT L4.animalType, COUNT(DISTINCT tagID) AS num " +
					"FROM Livestock_4 L4 " +
					"GROUP BY L4.animalType";

			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				JSONObject json = new JSONObject();
				json.put("animalType", rs.getString("animalType"));
				json.put("count", rs.getObject("num"));
				livestock.add(json);
			}

			rs.close();
			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
		return livestock;
	}
	public ArrayList<JSONObject> findCountedTypesSoldByAge(int age) {
		ArrayList<JSONObject> livestock = new ArrayList<JSONObject>();
		try {
			String query = "SELECT L4.animalType, COUNT(DISTINCT tagID) AS num " +
					"FROM Livestock_4 L4 " +
					" WHERE  L4.age < ? " +
					"GROUP BY L4.animalType";

			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setInt(1, age);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				JSONObject json = new JSONObject();
				json.put("animalType", rs.getString("animalType"));
				json.put("count", rs.getObject("num"));
				livestock.add(json);
			}

			rs.close();
			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
		return livestock;
	}


	// Gets the total amount of water and food spent given a livestock id.
	public ArrayList<JSONObject> getWaterAndFoodSpentOfLivestock(int tagID) {
		ArrayList<JSONObject> livestock = new ArrayList<JSONObject>();
		try {
			String query = "SELECT N.tagID AS tagID, SUM(N.waterSpent) AS totalWaterConsumed," +
					" SUM(N.foodSpent) AS totalFoodConsumed " +
					"FROM Nurtures N, Livestock_4 L4 " +
					"WHERE N.tagID = L4.tagID AND L4.tagID = ? " +
					"GROUP BY N.tagID ";

			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setInt(1, tagID);

			ResultSet rs = ps.executeQuery();

			while(rs.next()) {
				JSONObject json = new JSONObject();
				json.put("tagID", rs.getInt("tagID"));
				json.put("totalWaterConsumed", rs.getInt("totalWaterConsumed"));
				json.put("totalFoodConsumed", rs.getInt("totalFoodConsumed"));
				livestock.add(json);
			}

			rs.close();
			ps.close();

		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
		return livestock;
	}

	// AGGREGATION GROUP BY WITH HAVING
	// Find all the animals (of an animal type) that have been fed well with water and food.
	// (most plump animals?) :D
	public ArrayList<JSONObject> findWateredAndFed(AnimalType animalType, int water, int food) {
		ArrayList<JSONObject> livestock = new ArrayList<JSONObject>();
		try {
			String query =
					" SELECT l4.tagID AS tagID, " +
					"       l4.animalType AS animalType, " +
					"       l4.age AS age, " +
					"       l1.diet AS diet, " +
					"       l4.weight AS weight, " +
					"       l4.lastFed AS lastFed, " +
					"       l3.harvestable AS harvestable, " +
					"       l4.lastViolatedForHarvestedGoods AS lastViolatedForHarvestedGoods, " +
					"       SUM(N.waterSpent) AS totalWaterSpent, " +
					"       SUM(N.foodSpent) AS totalFoodSpent " +
					" FROM LIVESTOCK_4 l4 " +
					" INNER JOIN LIVESTOCK_3 l3 ON l4.animalType = l3.animalType AND l4.age = l3.age " +
					" INNER JOIN LIVESTOCK_1 l1 ON l1.animalType = l4.animalType AND l1.weight = l4.weight " +
					" INNER JOIN Nurtures N ON l4.tagID = N.tagID " +
					" WHERE l4.animalType = ? " +
					" GROUP BY l4.tagID, l4.animalType, l4.age, l1.diet, l4.weight, l4.lastFed, l3.harvestable, l4.lastViolatedForHarvestedGoods " +
					" HAVING SUM(N.waterSpent) >= ? AND SUM(N.foodSpent) >= ? ";

			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setString(1, animalType.toString().toLowerCase());
			ps.setInt(2, water);
			ps.setInt(3, food);

			ResultSet rs = ps.executeQuery();

			while(rs.next()) {
				JSONObject json = new JSONObject();
				json.put("tagID", rs.getInt("tagID"));
				json.put("animalType", AnimalType.valueOf(rs.getString("animalType").toUpperCase()));
				json.put("age", rs.getInt("age"));
				json.put("diet", CropType.valueOf(rs.getString("diet").toUpperCase()));
				json.put("weight", rs.getDouble("weight"));
				json.put("lastFed", rs.getDate("lastFed"));
				json.put("harvestable", rs.getBoolean("harvestable"));
				json.put("lastViolatedForHarvestedGoods", rs.getDate("lastViolatedForHarvestedGoods"));
				json.put("totalWaterSpent", rs.getInt("totalWaterSpent"));
				json.put("totalFoodSpent", rs.getInt("totalFoodSpent"));
				livestock.add(json);
			}


			rs.close();
			ps.close();

		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
		return livestock;
	}


	// NESTED AGGREGATION WITH GROUP BY
	public ArrayList<JSONObject> findOverweightAnimals() {
		ArrayList<JSONObject> livestock = new ArrayList<JSONObject>();
		try {
			String query = "CREATE VIEW temp AS SELECT animalType, AVG(weight) AS avgweight FROM Livestock_1 GROUP BY animalType; " +
					"SELECT L4.animalType, L1.diet " +
					"FROM Livestock_4 L4, Livestock_1 L1 " +
					"WHERE L4.animalType = L1.animalType AND L4.weight = L1.weight " +
					"GROUP BY L4.animalType, L1.diet " +
					"HAVING AVG(L4.weight) >= (SELECT avgweight FROM temp WHERE animalType = L4.animalType)";

			// TODO: find a way to drop view temp.

			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				JSONObject json = new JSONObject();
				json.put("animalType", rs.getString("animalType"));
				json.put("diet", rs.getObject("diet"));
				livestock.add(json);
			}

			rs.close();
			ps.close();
		} catch(Exception e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
		return livestock;
	}

	// Division
	// Need a param to indicate which query
	public ArrayList<JSONObject> findAllFarmersDivision(int type) {
		ArrayList<JSONObject> result = new ArrayList<JSONObject>();
		try {
			String query;
			if (type == 1) {
				 query = "SELECT * FROM Farmers_2 F2 WHERE NOT " +
						"EXISTS (((SELECT tagID FROM Livestock_4) " +
						"MINUS (SELECT tagID FROM Nurtures WHERE farmerID = F2.farmerID)))";
			} else {
				query = "SELECT * FROM Farmers_2 F2 " +
						"WHERE NOT EXISTS(((SELECT plotNum FROM Fields_4)" +
						"                MINUS" +
						"                (SELECT plotNum FROM Tends WHERE farmerID = F2.farmerID)))";
			}

			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ResultSet rs = ps.executeQuery();

			while(rs.next()) {
				JSONObject json = new JSONObject();
				json.put("farmerID", rs.getInt("farmerID"));
				json.put("fullName", rs.getString("fullName"));
				json.put("yearsOfEmployment", rs.getInt("yearsOfEmployment"));
				result.add(json);
			}

			rs.close();
			ps.close();

		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
		return result;
	}
	// ================ GENERAL PROJECTION FUNCTIONS ===================================
	public ArrayList<String> getUserTables() {
		ArrayList<String> tables = new ArrayList<String>();

		try {
			String query = "select table_name from user_tables";

			PrintablePreparedStatement ps =
					new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ResultSet rs = ps.executeQuery();

			while(rs.next()) {
				tables.add(rs.getString("table_name"));
			}

			rs.close();
			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}

		return tables;
	}
	public ArrayList<String> getTableColumns(String tableName) {
		ArrayList<String> columns = new ArrayList<String>();

		try {
			String query = "select column_name from ALL_TAB_COLUMNS WHERE table_name= ?";

			PrintablePreparedStatement ps =
					new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setString(1, tableName.toUpperCase());

			ResultSet rs = ps.executeQuery();

			while(rs.next()) {
				columns.add(rs.getString("column_name"));
			}

			rs.close();
			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}

		return columns;
	}

	// ================ FUNCTION FOR POPULATING DATABASE ===============================
	public boolean insertLivestock_3(Livestock_3_Model model) {
		try {
			String query = "DECLARE " +
					"    n int := 0; " +
					"BEGIN " +
					"    SELECT count(*) into n " +
					"    from Livestock_3 " +
					"    where animalType = ? AND age = ?; " +
					"    if n = 0 then " +
					"        insert into Livestock_3(animalType, age, harvestable) VALUES (?, ?, ?); " +
					"    end if; " +
					"END; ";
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setString(1, model.getAnimalType().toString().toLowerCase());
			ps.setInt(2, model.getAge());
			ps.setString(3, model.getAnimalType().toString().toLowerCase());
			ps.setInt(4, model.getAge());
			ps.setBoolean(5, model.isHarvestable());

			ps.executeUpdate();
			connection.commit();

			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
			rollbackConnection();
			return false;
		}
		// Succesfully inserted without errors
		return true;

	}
	public boolean insertLivestock_1(Livestock_1_Model model) {
		try {
			String query = "DECLARE " +
					"    n int := 0; " +
					"BEGIN " +
					"    SELECT count(*) into n " +
					"    from Livestock_1 where animalType = ? AND " +
					"                           WEIGHT = ?; " +
					"    if n = 0 then " +
					"        insert into Livestock_1(animalType, weight, diet) VALUES (?, ?, ?); " +
					"    end if; " +
					"end;";
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setString(1, model.getAnimalType().toString().toLowerCase());
			ps.setDouble(2, model.getWeight());
			ps.setString(3, model.getAnimalType().toString().toLowerCase());
			ps.setDouble(4, model.getWeight());
			ps.setString(5, model.getDiet().toString().toLowerCase());

			ps.executeUpdate();
			connection.commit();

			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
			rollbackConnection();
			return false;
		}
		// Succesfully inserted without errors
		return true;
	}
	private void populateLivestock_3() {
		try {
			// Insert values for all animal types ages 1-15
			for (int i = 1; i <= 15; i++) {
				// insert cows
				Livestock_3_Model temp = new Livestock_3_Model(AnimalType.COW, i, getRandomBool());
				insertLivestock_3(temp);

				// insert pigs
				temp = new Livestock_3_Model(AnimalType.PIG, i, getRandomBool());
				insertLivestock_3(temp);

				// insert chicken
				temp = new Livestock_3_Model(AnimalType.CHICKEN, i, getRandomBool());
				insertLivestock_3(temp);

				// insert sheep
				temp = new Livestock_3_Model(AnimalType.SHEEP, i, getRandomBool());
				insertLivestock_3(temp);
			}

		} catch (Exception e) {
			System.out.println(e);
		}
	}
	private void populateLivestock_1() {
		try {

			for (int i = 0; i <= 40; i++) {
				// Insert cows weighted 300-500 kg (increments of 5) (40 cows total)
				Livestock_1_Model temp = new Livestock_1_Model(AnimalType.COW, getRandomCropType(), (5*i+300));
				insertLivestock_1(temp);

				// insert pigs weighted 50-250 kg (increments of 5)  (40 pigs total)
				temp = new Livestock_1_Model(AnimalType.PIG, getRandomCropType(), 5*i+50);
				insertLivestock_1(temp);

				// insert chicken weighted 1-41 kg (increments of 1) (40 chickens total)
				temp = new Livestock_1_Model(AnimalType.CHICKEN, getRandomCropType(), i+1);
				insertLivestock_1(temp);

				// insert sheep weighted 50-250 kg (increments of 5)  (40 sheeps total)
				temp = new Livestock_1_Model(AnimalType.SHEEP, getRandomCropType(), 5*i+50);
				insertLivestock_1(temp);
			}

		} catch (Exception e) {
			System.out.println(e);
		}
	}
	public void populateLivestock() {
		populateLivestock_3();
		populateLivestock_1();
	}
	public boolean getRandomBool() {
		Random random = new Random();
		return random.nextBoolean();
	}
	public CropType getRandomCropType() {
		Random random = new Random();
		int crop = random.nextInt(0, 6);

		switch (crop) {
			case 0:
				return CropType.MUSTARD;
			case 1:
				return CropType.CANOLA;
			case 2:
				return CropType.WHEAT;
			case 3:
				return CropType.CORN;
			case 4:
				return CropType.POTATOES;
			case 5:
				return CropType.COCONUT;
		}
		return CropType.WHEAT;
	}

	//============================= FROM TUTORIAL ===================================
	public void deleteBranch(int branchId) {
		try {
			String query = "DELETE FROM branch WHERE branch_id = ?";
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setInt(1, branchId);

			int rowCount = ps.executeUpdate();
			if (rowCount == 0) {
				System.out.println(WARNING_TAG + " Branch " + branchId + " does not exist!");
			}

			connection.commit();

			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
			rollbackConnection();
		}
	}

	public void insertBranch(BranchModel model) {
		try {
			String query = "INSERT INTO branch VALUES (?,?,?,?,?)";
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setInt(1, model.getId());
			ps.setString(2, model.getName());
			ps.setString(3, model.getAddress());
			ps.setString(4, model.getCity());
			if (model.getPhoneNumber() == 0) {
				ps.setNull(5, java.sql.Types.INTEGER);
			} else {
				ps.setInt(5, model.getPhoneNumber());
			}

			ps.executeUpdate();
			connection.commit();

			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
			rollbackConnection();
		}
	}

	public BranchModel[] getBranchInfo() {
		ArrayList<BranchModel> result = new ArrayList<BranchModel>();

		try {
			String query = "SELECT * FROM branch";
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ResultSet rs = ps.executeQuery();

			while(rs.next()) {
				BranchModel model = new BranchModel(rs.getString("branch_addr"),
						rs.getString("branch_city"),
						rs.getInt("branch_id"),
						rs.getString("branch_name"),
						rs.getInt("branch_phone"));
				result.add(model);
			}

			rs.close();
			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}

		return result.toArray(new BranchModel[result.size()]);
	}

	public void updateBranch(int id, String name) {
		try {
			String query = "UPDATE branch SET branch_name = ? WHERE branch_id = ?";
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setString(1, name);
			ps.setInt(2, id);

			int rowCount = ps.executeUpdate();
			if (rowCount == 0) {
				System.out.println(WARNING_TAG + " Branch " + id + " does not exist!");
			}

			connection.commit();

			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
			rollbackConnection();
		}
	}



	private void rollbackConnection() {
		try  {
			connection.rollback();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
	}

	public void databaseSetup() {
		dropBranchTableIfExists();

		try {
			String query = "CREATE TABLE branch (branch_id integer PRIMARY KEY, branch_name varchar2(20) not null, branch_addr varchar2(50), branch_city varchar2(20) not null, branch_phone integer)";
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.executeUpdate();
			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}

		BranchModel branch1 = new BranchModel("123 Charming Ave", "Vancouver", 1, "First Branch", 1234567);
		insertBranch(branch1);

		BranchModel branch2 = new BranchModel("123 Coco Ave", "Vancouver", 2, "Second Branch", 1234568);
		insertBranch(branch2);
	}

	private void dropBranchTableIfExists() {
		try {
			String query = "select table_name from user_tables";
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ResultSet rs = ps.executeQuery();

			while(rs.next()) {
				if(rs.getString(1).toLowerCase().equals("branch")) {
					// TODO: check over this. Temp. commented out
					// ps.execute("DROP TABLE branch");
					break;
				}
			}

			rs.close();
			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
	}
}
