import axios from "axios";


const PATH = "/api/get";

/**
 * Retrieves user tables
 */
export const getUserTables = async () => {
	const res = await axios.get(`${PATH}/usertables`);

	if (res.data) return res.data;
	else throw new Error("Failed to retrieve user tables!");
};

/**
 * Retrieves data values
 */
export const getDataValues = async (selectedTable: string, selectedColumns: String[]) => {
  const res = await axios.post(`${PATH}/values`, { table: selectedTable, columns: selectedColumns }, {
		headers: {
			"Content-Type": "application/json",
		},
	});
  return res.data;
};

/**
 * Retrieves table columns
 */
export const getTableColumns = async (selectedTable: any) => {
   const res = await axios.post(`${PATH}/tablecolumns`, { table_name: selectedTable }, {
		headers: {
			"Content-Type": "application/json",
		},
	});
  return res.data;
};
