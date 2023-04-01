package database;

import java.sql.*;
import java.util.ArrayList;

import org.json.JSONObject;

import model.enums.AnimalType;
import model.enums.CropType;

import model.BranchModel;
import model.LivestockModel;
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

			System.out.println("\nConnected to Oracle!");
			return true;
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
			return false;
		}
	}


	//===================Livestock methods==============================

  // TODO: implement this
  // TODO: overload this method to allow for filtering
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
	public boolean updateLivestock(LivestockModel model) {
		try {
			String query = "UPDATE Livestock_4 SET tagID = ?," +
					"animalType = ?," +
					"age = ?," +
					"weight = ?," +
					"lastFed = ?," +
					"lastViolatedForHarvestedGoods = ?," +
					"WHERE tagID = ?";
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setInt(1, model.getTagID());
			ps.setString(2, model.getAnimalType().toString().toLowerCase());
			ps.setInt(3, model.getAge());
			ps.setDouble(4, model.getWeight());
			ps.setDate(5, model.getLastFed());
			ps.setDate(6, model.getLastViolatedForHarvestedGoods());
			ps.setInt(7, model.getTagID());
			ps.executeUpdate();

			connection.commit();
			ps.close();
		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
			rollbackConnection();
			return false;
		}
		return true;
	}

	// SELECTION Query
	// Finds the animals that are ready to sell with user specified weight
	// TODO: Figure out what needs to be passed into this function for weight
	public ArrayList<JSONObject> findAnimalToSell(LivestockModel model) {
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
	public ArrayList<JSONObject> findColumns(String relation_name, ArrayList<String> strings) {
		ArrayList<JSONObject> to_return = new ArrayList<JSONObject>();
		try {
			String query = "SELECT DISTINCT " + strings.toString() + " FROM" + relation_name;
			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);

			ResultSet rs = ps.executeQuery();


			while(rs.next()) {
				JSONObject json = new JSONObject();
				for (int i = 0; i < strings.size();  i++) {
					json.put(strings.get(i), rs.getObject(i));
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
			String query = "SELECT tagID, animalType, healthStatus FROM Livestock_4 L4, " +
					"VeterinaryRecords_Has VR WHERE VR.tagID = L4.tagID and L4.tagID = ?";

			PrintablePreparedStatement ps = new PrintablePreparedStatement(connection.prepareStatement(query), query, false);
			ps.setInt(1, id);

			ResultSet rs = ps.executeQuery();

			while(rs.next()) {
				int tag_to_add = rs.getInt("tagID");
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("tagID", tag_to_add);
				livestock.add(jsonObject);
			}

			rs.close();
			ps.close();

		} catch (SQLException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}

		return livestock;
	}

	// Aggregation with group by

	public ArrayList<JSONObject> findCountedTypesSold() {
		return null;
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
