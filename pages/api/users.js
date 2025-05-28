// pages/api/users.js
import { getAllData } from "../../actions/dbHelpers";

export default async function handler(req, res) {
  try {
    const users = await getAllData('users');
    res.status(200).json(users);
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
