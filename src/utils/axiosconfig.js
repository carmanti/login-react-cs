import axios from "axios";

export const login = async (username, password) => {
  try {
    const res = await axios.post("https://localhost:5270/api/cuentas/login", {
      username,
      password,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
