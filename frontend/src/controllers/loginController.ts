import axios from "axios";

export const TOTALLY_SECRET_USERNAME = "farmer";
export const TOTALLY_SECRET_PASSWORD = "password";

export const login = async (username: string, password: string) => {
  if (username === TOTALLY_SECRET_USERNAME && password === TOTALLY_SECRET_PASSWORD) {
    const res = await axios.post("/api/login", { username, password })
    return res.data;
  } else {
    throw new Error("Invalid username or password");
  };
};
