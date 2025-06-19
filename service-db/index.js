const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "observability",
});

async function ensureTable() {
  const client = await pool.connect();
  try {
    await client.query(
      `CREATE TABLE IF NOT EXISTS test (
         id SERIAL PRIMARY KEY,
         content TEXT NOT NULL,
         created_at TIMESTAMP DEFAULT NOW()
       )`
    );
  } finally {
    client.release();
  }
}

ensureTable().catch((err) => {
  console.error("Erreur lors de la création de la table:", err);
  process.exit(1);
});

app.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "INSERT INTO test(content) VALUES($1) RETURNING id, created_at",
      ["Nouvelle entrée depuis /"]
    );
    const inserted = rows[0];

    res.status(200).json({
      status: "success",
      entry: inserted,
    });
  } catch (err) {
    console.error("Erreur insertion:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.listen(PORT, () => console.log(`service-js listening on ${PORT}`));
