import axios from "axios";

import { ActionTypes, AnimalType } from "@utils/enums";


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
  // console.log(filteredData);

	const res = await axios.post(`${PATH}/filteredValues`, filteredData, {
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
  else throw new Error(`Failed to insert a ${livestock.animalType}!`);
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
  else throw new Error(`Failed to delete livestock with tagID #${livestock.tagID}!`);
};

/**
 * Updates a livestock
 */
export const updateLivestock = async (livestock: Livestock, action: ActionTypes) => {
  const livestockJson = JSON.stringify(livestock);
  console.log(livestockJson);
  const res = await axios.post(`${PATH}/update`, {actionType: action, livestock: livestockJson}, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.data) return res.data;
  else throw new Error(`Failed to update livestock with tagID #${livestock.tagID}!`);
};

/**
 * Retrieves the count of a livestock
 */
export const getVetRecords = async (livestock: Livestock) => {
	const res = await axios.post(`/api/get/vetRecords`, livestock, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.data) return res.data[0];
	else throw new Error(`Failed to retrieve vet records of livestock with tagID #${livestock.tagID}!`);
};

/**
 * Retrieves the count of a livestock
 */
export const getLivestockCount = async (animalType: AnimalType) => {
  const res = await axios.post(`${PATH}/get/animalCount`, animalType, {
		headers: {
			"Content-Type": "application/json",
		},
	});

  if (res.data) return res.data;
  else throw new Error(`Failed to retrieve count of ${animalType}!`);
};
