import axios from "axios";

import { ActionTypes } from "@utils/enums";


const PATH = "/api/livestock";


/**
 * Retrieves the livestock
 */
export const retrieveLivestock = async () => {
  const res = await axios.get(PATH);
  
  if (res.data) return res.data;
  else throw new Error("Failed to retrieve livestock!");
};

/**
 * Retrieves the filtered livestock
 */
export const retrieveFilteredLivestock = async (filteredData: FilteredLivestock) => {
  // console.log("filteredData: ", filteredData);

	const res = await axios.post(PATH, filteredData, {
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
  const res = await axios.post(`${PATH}/insert`, livestockJson, {
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
	const res = await axios.post(`${PATH}/delete`, livestockJson, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.data) return res.data;
	else throw new Error("Failed to delete livestock!");
};

/**
 * Updates a livestock
 */
export const updateLivestock = async (livestock: Livestock, action: ActionTypes) => {
  const livestockJson = JSON.stringify(livestock);
  const res = await axios.post(`${PATH}/${action.toLowerCase()}`, livestockJson, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.data) return res.data;
  else throw new Error("Failed to update livestock!");
};
