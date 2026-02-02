const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require("./sql/sequelize");
const { Authors, Books } = require("./sql/models");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.get("/api/authors", (req, res) => {
  Authors.findAll()
    .then((authors) => {
      res.json(authors);
    })
    .catch((error) => {
      res.status(500).json({ error: "Unable to fetch authors" });
    });
});

app.post("/api/authors", (req, res) => {
  const { name, year_of_birth } = req.body;
  if (!name || !year_of_birth) {
    return res
      .status(400)
      .json({ error: "Name and year of birth are required" });
  }
  Authors.create({ name, year_of_birth })
    .then((author) => {
      res.status(201).json(author);
    })
    .catch((error) => {
      res.status(500).json({ error: "Unable to create author" });
    });
});


app.listen(port, () => {
  sequelize
    .authenticate()
    .then(() => {
      sequelize
        .sync()
        .then(() => {
          console.log("Database and tables created!");
        })
        .catch((error) => {
          console.error("Error syncing database:", error);
        });
    })
    .catch((error) => {
      console.error("Unable to connect to the database or sync tables:", error);
    });
});
