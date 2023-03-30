import axios from "axios";

export const TOTALLY_SECRET_USERNAME = "farmer";
export const TOTALLY_SECRET_PASSWORD = "password";

/**
 * This is a fake login function that will return a fake token if the username and password are correct.
 * 
 * TODO: Replace this with a real login function that will return a real token (maybe).
 */
export const login = async (username: string, password: string) => {
  if (username === TOTALLY_SECRET_USERNAME && password === TOTALLY_SECRET_PASSWORD) {
    const res = await axios.post("/api/login", { username, password })
    return res.data;
  } else if (!username || !password) {
    throw new Error("Looks like you didn't plant anything in the fields!");
  } else {
    throw new Error("The seeds in the fields are bad!");
  };
};
