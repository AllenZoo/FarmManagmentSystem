import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import styles from "./ViewUserInventoryPanel.module.scss";

/**
 * Renders the 'View Inventory' panel of User Info
 */
export const ViewInventoryPanel = () => {
  // ============= LOGIC FOR USER INPUT =============
  const [tables, setTables] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const [selectedTable, setSelectedTable] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const selectOptions = useMemo(() => {
    return createSelectColumnItems();
  }, [columns]);

  // Inpsired by: https://stackoverflow.com/questions/36205673/how-do-i-create-a-dynamic-drop-down-list-with-react-bootstrap
  function createSelectTableItems() {
    let items = [];
    for (let i = 0; i < tables.length; i++) {
      items.push(
        <option key={tables[i]} value={tables[i]}>
          {tables[i]}
        </option>
      );
      //here I will be creating my options dynamically based on
      //what props are currently passed to the parent component
    }
    return items;
  }

  async function OnSelectTable(e: any) {
    console.log("User selected table: ", e.target.value);
    await axios
      .post("http://localhost:3000/api/get/tablecolumns", {
        table_name: e.target.value,
      })
      .then((res) => {
        console.log(res.data);
        setColumns(res.data);
        setSelectedTable(e.target.value);
        setSelectedColumns([]);
      });
  }

  function createSelectColumnItems() {
    let items = [];
    for (let i = 0; i < columns.length; i++) {
      items.push(
        <option key={columns[i]} value={columns[i]}>
          {columns[i]}
        </option>
      );
    }
    return items;
  }

  // TODO: fix to process multiple selects.
  function OnSelectColumn(e: any) {
    console.log("User selected column: ", e.target.value);
    setSelectedColumns([...columns, e.target.value]);
  }

  useEffect(() => {
    axios.get("http://localhost:3000/api/get/usertables").then((res) => {
      console.log(res.data);
      setTables(res.data);
    });
  }, []);

  useEffect(() => {
    createSelectColumnItems();
  }, [columns]);

  // ============= RENDER =============
  const [data, setData] = useState<any>([]);

  function getData() {
    axios
      .post("http://localhost:3000/api/get/values", {
        table: selectedTable,
        columns: selectedColumns,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }

  return (
    <div>
      <h1>View Inventory</h1>
      <select className={styles.Select} onChange={OnSelectTable}>
        {createSelectTableItems()}
      </select>
      <select
        className={styles.Select}
        onChange={OnSelectColumn}
        multiple={true}
      >
        {selectOptions}
      </select>
      <button className={styles.Button} onClick={getData}>
        View
      </button>
    </div>
  );
};
