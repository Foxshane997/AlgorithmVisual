const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "views", "index.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send("Server error occurred.");
    }
  });
});

app.get("/sorting", (req, res) => {
  const filePath = path.join(__dirname, "views", "sorting.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send("Server error occurred.");
    }
  });
});

app.get("/search", (req, res) => {
  const filePath = path.join(__dirname, "views", "search.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send("Server error occurred.");
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});