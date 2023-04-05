import { useState } from "react";

import {
  getFarmers,
  getGOATFarmers,
} from "@controllers/companyInfoControllers";

import styles from "./ViewCompanyInfoPanel.module.scss";


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders the 'View Company Info' panel of Company Fun Facts
 */
const ViewCompanyInfoPanel = () => {
  const [farmers, setFarmers] = useState<any[]>([]);
  const [goatFarmers, setGOATFarmers] = useState<any[]>([]);

  const [viewFarmers, setViewFarmers] = useState<boolean>(false);
  const [viewGOATFarmers, setViewGOATFarmers] = useState<boolean>(false);

  /**
   * Gets the farmers info
   * @param type 1 = livestock, 2 = fields, 3 = GOAT farmers
   */
  const getFarmersInfo = async (type: number) => {
    if (type !== 3) {
      const farmers = await getFarmers(type);
      setFarmers(farmers);
      setViewFarmers(true);
      setViewGOATFarmers(false);
    } else {
      const farmers = await getGOATFarmers();
      setGOATFarmers(farmers);
      setViewFarmers(false);
      setViewGOATFarmers(true);
    }
  }

  /**
   * Creates a table of farmers
   * @param isGoated if the table is for GOAT farmers
   */
  const createFarmersTable = (isGoated?: boolean) => {
    const farmersData = isGoated ? goatFarmers : farmers;

    return (
      <table className={styles.Table}>
        <thead>
          <th key="farmer_id">Farmer ID</th>
          <th key="farmer_name">Full Name</th>
          <th key="farmer_yoe">Years of Employment</th>
          {isGoated && <th key="farmer_count">Nurture Count </th>}
        </thead>

        <tbody>
          {farmersData.map((farmer) => (
            <tr key={farmer.farmerID}>
              <td key={farmer.farmerID}>{farmer.farmerID}</td>
              <td key={farmer.farmerID + farmer.fullName}>{farmer.fullName}</td>
              <td key={farmer.farmerID + farmer.yearsOfEmployment}>
                {farmer.yearsOfEmployment}
              </td>
              { isGoated && (
                <td key={farmer.farmerID + farmer.maxNurtureCount}>
                  {farmer.maxNurtureCount}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.Panel}>
      <main>
        <div className={styles.ControlPanel}>
          <h1>View Company Info</h1>

          <div className={styles.Controls}>
            <button
              className={styles.Button}
              onClick={() => getFarmersInfo(1)}
            >
              View Farmers Who Have Fed ALL Livestock
            </button>

            <button
              className={styles.Button}
              onClick={() => getFarmersInfo(2)}
            >
              View Farmers Who Have Tended ALL Fields
            </button>
            
            <button
              className={styles.Button}
              onClick={() => getFarmersInfo(3)}
            >
              View The GOATED! Farmers' Leaderboard
            </button>
          </div>
        </div>

        <div className={styles.DisplayPanel}>
          {viewFarmers && createFarmersTable()}
          {viewGOATFarmers && createFarmersTable(true)}
        </div>
      </main>
    </div>
  );
};

export default ViewCompanyInfoPanel;
