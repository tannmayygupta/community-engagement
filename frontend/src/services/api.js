// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5001/api/users"; // Your backend API URL

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}`, userData); // Correct URL
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
