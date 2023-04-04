import { useState } from "react";
import styles from "./ViewCompanyInfoPanel.module.scss";
import axios from "axios";
import { getFarmers } from "@controllers/companyInfoControllers";

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders the 'View Company Info' panel of Company Fun Facts
 */
const ViewCompanyInfoPanel = () => {
  const [farmers, setFarmers] = useState<any[]>([]);

  async function getFeedingFarmers() {
    let farmers = await getFarmers(1);
    setFarmers(farmers);
    // console.log(farmers);
  }

  async function getTendingFarmers() {
    let farmers = await getFarmers(2);
    setFarmers(farmers);
    // console.log(farmers);
  }

  // Create table of farmers
  const createFarmersTable = () => {
    let table = [];
    let header = [];
    let body = [];

    // Create header
    header.push(<th key="farmer_id">Farmer ID</th>);
    header.push(<th key="farmer_name">Full Name</th>);
    header.push(<th key="farmer_yoe">Years of Employment</th>);

    // Create body
    for (let i = 0; i < farmers.length; i++) {
      let row = [];
      row.push(<td key={farmers[i].farmerID}>{farmers[i].farmerID}</td>);
      row.push(
        <td key={farmers[i].farmerID + farmers[i].fullName}>
          {farmers[i].fullName}
        </td>
      );
      row.push(
        <td key={farmers[i].farmerID + farmers[i].yearsOfEmployment}>
          {farmers[i].yearsOfEmployment}
        </td>
      );

      body.push(<tr key={farmers[i].farmerID}>{row}</tr>);
    }

    table.push(<thead key="thead">{header}</thead>);
    table.push(<tbody key="tbody">{body}</tbody>);
    return table;
  };

  return (
    <div className={styles.Panel}>
      <main>
        <div className={styles.ControlPanel}>
          <h1>View Company Info</h1>

          <div className={styles.Controls}>
            <button className={styles.Button} onClick={getFeedingFarmers}>
              View Farmers Who Have Fed ALL Livestock
            </button>
            <button className={styles.Button} onClick={getTendingFarmers}>
              View Farmers Who Have Tended ALL Fields
            </button>
          </div>
        </div>
        
        <div className={styles.DisplayPanel}>
          <table className={styles.Table}>{createFarmersTable()}</table>
        </div>
      </main>
    </div>
  );
};

export default ViewCompanyInfoPanel;
