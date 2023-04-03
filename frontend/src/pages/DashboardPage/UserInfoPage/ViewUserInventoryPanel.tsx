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

  function OnSelectColumn(e: any) {
    let value = Array.from(
      e.target.selectedOptions,
      (option: any) => option.value
    );

    console.log("User selected column: ", value);

    setSelectedColumns(value);
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

  function createTable() {
    let table = [];

    // Outer loop to create parent
    for (let i = 0; i < data.length; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < selectedColumns.length; j++) {
        children.push(<td>{data[i][selectedColumns[j]]}</td>);
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>);
    }
    return table;
  }

  return (
    <div>
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
      <div>
        <table className={styles.Table}>
          <thead>
            <tr>
              {selectedColumns.map((column) => (
                <th>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>{createTable()}</tbody>
        </table>
      </div>
    </div>
  );
};
