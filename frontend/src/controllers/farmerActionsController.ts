import axios from "axios";

/**
 * Retrieves the livestock from the backend
 */
export const retrieveLivestock = async () => {
  const res = await axios.get("/api/livestock");
  
  if (res.data) return res.data;
  else throw new Error("Failed to retrieve livestock!");
};

/**
 * Inserts a new livestock into the backend
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
