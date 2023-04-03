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
  }

  async function getTendingFarmers() {
    let farmers = await getFarmers(2);
    setFarmers(farmers);
  }

  // Create table of farmers
  const createFarmersTable = () => {
    let table = [];
    let header = [];
    let body = [];

    // Create header
    header.push(<th key="farmer_id">Farmer ID</th>);
    header.push(<th key="farmer_name">Farmer Name</th>);
    header.push(<th key="farmer_email">Farmer Email</th>);
    header.push(<th key="farmer_phone">Farmer Phone</th>);
    header.push(<th key="farmer_address">Farmer Address</th>);
    header.push(<th key="farmer_city">Farmer City</th>);

    // Create body
    for (let i = 0; i < farmers.length; i++) {
      let row = [];
      row.push(<td key={farmers[i].farmer_id}>{farmers[i].farmer_id}</td>);
      row.push(<td key={farmers[i].farmer_name}>{farmers[i].farmer_name}</td>);

      // Email
      let email = farmers[i].farmer_email;
      if (email === null) {
        email = "N/A";
      }
      row.push(<td key={farmers[i].farmer_email}>{email}</td>);
      // Phone
      let phone = farmers[i].farmer_phone;
      if (phone === null) {
        phone = "N/A";
      }
      row.push(<td key={farmers[i].farmer_phone}>{phone}</td>);
      // Address
      let address = farmers[i].farmer_address;
      if (address === null) {
        address = "N/A";
      }
      row.push(<td key={farmers[i].farmer_address}>{address}</td>);
      // City
      let city = farmers[i].farmer_city;
      if (city === null) {
        city = "N/A";
      }
      row.push(<td key={farmers[i].farmer_city}>{city}</td>);
      body.push(<tr key={farmers[i].farmer_id}>{row}</tr>);
    }

    table.push(<thead key="thead">{header}</thead>);
    table.push(<tbody key="tbody">{body}</tbody>);
    return table;
  };

  return (
    <>
      <div>
        <h1>View Company Info</h1>
        <button className={styles.Button} onClick={getFeedingFarmers}>
          Get Farmers who have fed ALL Livestock :OO
        </button>
        <button className={styles.Button} onClick={getTendingFarmers}>
          Get Farmers who have tended ALL Fields :OO
        </button>
      </div>
    </>
  );
};

export default ViewCompanyInfoPanel;
