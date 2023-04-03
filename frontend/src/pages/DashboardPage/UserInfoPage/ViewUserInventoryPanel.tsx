import { useEffect, useMemo, useState } from "react";

import { getDataValues, getTableColumns, getUserTables } from "@controllers/userInfoControllers";

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

  const selectOptions = useMemo(() => {
    return createSelectColumnItems();
  }, [columns]);

  // Inpsired by: https://stackoverflow.com/questions/36205673/how-do-i-create-a-dynamic-drop-down-list-with-react-bootstrap
  const createSelectTableItems = () => {
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

  const onSelectTable = async (e: any) => {
    console.log("User selected table: ", e.target.value);
    const data = await getTableColumns(e.target.value);
    setColumns(data);
    setSelectedTable(e.target.value);
    setSelectedColumns([]);
  }

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
  }

  // TODO: fix to process multiple selects.
  const onSelectColumn = (e: any) => {
    console.log("User selected column: ", e.target.value);
    setSelectedColumns([...columns, e.target.value]);
  }

  const getTables = async () => {
    const data = await getUserTables();
    setTables(data);
  };

  const getData = async () => {
    const data = await getDataValues(selectedTable, selectedColumns);
    setData(data);
  }

  useEffect(() => {
    getTables();
  }, []);

  useEffect(() => {
    createSelectColumnItems();
  }, [columns]);

  return (
    <div>
      <h1>View Inventory</h1>
      <select className={styles.Select} onChange={onSelectTable}>
        {createSelectTableItems()}
      </select>
      <select
        className={styles.Select}
        onChange={onSelectColumn}
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

export default ViewInventoryPanel;
