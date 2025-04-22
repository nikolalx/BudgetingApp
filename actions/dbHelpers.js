import db from "../lib/db.js";

export async function getAllData(table) {
  const [rows] = await db.query(`SELECT * FROM ${table.toString().trim()}`); // Replace 'users' with your table name
  return rows;
}

export async function getUserById(id) {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
}

export async function getUserByUsername(username, table) {
  const [rows] = await db.query(`SELECT * FROM ${table.toString().trim()} WHERE username = ?`, [
    username.toString().trim(),
  ]);
  return rows[0];
}

export async function createUser(username, password, table) {
  const [result] = await db.query(
    `INSERT INTO ${table.toString().trim()} (username, password) VALUES (?, ?)`,
    [username, password]
  );
  return result.insertId;
}
