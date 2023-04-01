import axios from "axios";

/**
 * Retrieves the livestock
 */
export const retrieveLivestock = async () => {
  const res = await axios.get("/api/livestock");
  
  if (res.data) return res.data;
  else throw new Error("Failed to retrieve livestock!");
};

/**
 * Retrieves the filtered livestock
 */
export const retrieveFilteredLivestock = async (filteredData: FilteredLivestock) => {
	const res = await axios.post("/api/livestock", filteredData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

	if (res.data) return res.data;
	else throw new Error("Failed to retrieve filtered livestock!");
};

/**
 * Inserts a new livestock
 */
export const insertLivestock = async (livestock: Livestock) => {
  const livestockJson = JSON.stringify(livestock);
  const res = await axios.post("/api/livestock/insert", livestockJson, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.data) return res.data;
  else throw new Error("Failed to insert livestock!");
};

/**
 * Deletes a livestock
 */
export const deleteLivestock = async (livestock: Livestock) => {
  const livestockJson = JSON.stringify(livestock);
	const res = await axios.post("/api/livestock/delete", livestockJson, {
    headers: {
      "Content-Type": "application/json",
    },
  });

	if (res.data) return res.data;
	else throw new Error("Failed to delete livestock!");
};
