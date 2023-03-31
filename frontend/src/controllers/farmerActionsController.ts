import axios from "axios";

/**
 * Retrieves the livestock from the backend
 */
export const retrieveLivestock = async () => {
  const res = await axios.get("/api/livestock");
  if (res.data)
    return res.data;
  else
    throw new Error("Failed to retrieve livestock!");
};
