import axios from "axios";

const PATH = "/api/get";

/**
 * Retrieves data values
 */
export const getFarmers = async (type: number) => {
  const res = await axios.post(
    `${PATH}/farmerDiv`,
    { param: type },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
