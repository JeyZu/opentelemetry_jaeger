const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_SERVICE_HOST = process.env.DB_SERVICE_HOST || "http://service-db:3001";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${DB_SERVICE_HOST}/`);

    res.status(200).json({
      status: "success",
      serviceDb: response.data,
    });
  } catch (err) {
    console.error("Erreur appel service-db:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.listen(PORT, () => console.log(`service-js listening on ${PORT}`));
