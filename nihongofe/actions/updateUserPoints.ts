"use server";

import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api";
export const updateUserPoints = async (userId: number, currentPoints: number, exp: number) => {
  try {
    await axios.put(`${API_BASE_URL}/user-progress/${userId}`, {
      points: currentPoints + exp, 
    });
  } catch (error) {
    console.error("Error updating user points:", error);
    throw new Error("Failed to update user points.");
  }
};
