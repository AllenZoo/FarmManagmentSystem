import axios from "axios";

/**
 * Controls the login process by sending a POST request to the backend
 */
export const login = async (username: string, password: string) => {
  if (username && password) {
    const res = await axios.post("/api/login", { username, password })
    if (res.data) 
      return res.data;
    else
      throw new Error("The seeds in the fields are bad!");
  } else if (!username || !password) {
    throw new Error("Looks like you didn't plant anything in the fields!");
  };
};
