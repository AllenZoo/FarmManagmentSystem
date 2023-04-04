import { useEffect, useMemo, useState } from "react";

import {
  getDataValues,
  getTableColumns,
  getUserTables,
} from "@controllers/userInfoControllers";

import styles from "./ViewUserInventoryPanel.module.scss";

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders the 'View Inventory' panel of User Info
 */
const ViewInventoryPanel = () => {
  const [tables, setTables] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const [selectedTable, setSelectedTable] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const [data, setData] = useState<any>([]);

  // Inpsired by: https://stackoverflow.com/questions/36205673/how-do-i-create-a-dynamic-drop-down-list-with-react-bootstrap
  const createSelectTableItems = () => {
    let items = [];
    for (let i = 0; i < tables.length; i++) {
      items.push(
        <option key={tables[i]} value={tables[i]}>
          {tables[i]}
        </option>
      );
    }
    return items;
  };

  const onSelectTable = async (e: any) => {
    const data = await getTableColumns(e.target.value);
    setColumns(data);
    setSelectedTable(e.target.value);
    setSelectedColumns([]);
  };

  const createSelectColumnItems = () => {
    let items = [];
    for (let i = 0; i < columns.length; i++) {
      items.push(
        <option key={columns[i]} value={columns[i]}>
          {columns[i]}
        </option>
      );
    }
    return items;
  };

  const onSelectColumn = (e: any) => {
    let value = Array.from(
      e.target.selectedOptions,
      (option: any) => option.value
    );

    setSelectedColumns(value);
  };

  const getTables = async () => {
    const data = await getUserTables();
    setTables(data);
  };

  const getData = async () => {
    const data = await getDataValues(selectedTable, selectedColumns);
    setData(data);
  };

  const createTable = () => {
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
  };

  const selectOptions = useMemo(() => {
    return createSelectColumnItems();
  }, [columns]);

  useEffect(() => {
    getTables();
  }, []);

  useEffect(() => {
    createSelectColumnItems();
  }, [columns]);

  return (
    <div className={styles.Panel}>
      <main>
        <div className={styles.ControlPanel}>
          <h1>View Inventory</h1>
          <div className={styles.Controls}>
            <select
              className={styles.Select}
              onChange={onSelectTable}
            >
              {createSelectTableItems()}
            </select>
            <select
              className={styles.Select}
              id="selectColumn"
              onChange={onSelectColumn}
              multiple={true}
            >
              {selectOptions}
            </select>
            <button className={styles.Button} onClick={getData}>
              View
            </button>
          </div>
        </div>

        <div className={styles.DisplayPanel}>
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
      </main>
    </div>
  );
};

export default ViewInventoryPanel;
