import axios from "axios";

/**
 * This is a fake login function that will return a fake token if the username and password are correct.
 * 
 * TODO: Replace this with a real login function that will return a real token (maybe).
 */
export const login = async (username: string, password: string) => {
  if (username && password) {
    const res = await axios.post("/api/login", { username, password })
    return res.data;
  } else if (!username || !password) {
    throw new Error("Looks like you didn't plant anything in the fields!");
  } else {
    throw new Error("The seeds in the fields are bad!");
  };
};
