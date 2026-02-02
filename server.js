const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require("./sql/sequelize");
const { Authors, Books, Genres } = require("./sql/models");

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

app.get("/api/books", (req, res) => {
  Books.findAll({
    include: [
      {
        model: Authors,
        attributes: ["id", "name"],
      },
      {
        model: Genres,
      },
    ],
  })
    .then((books) => {
      return res.json(books);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Books could not be fetched" + err.message });
    });
});

app.get("/api/books/genre/:genre_id", (req, res) => {
  const { genre_id } = req.params;
  Books.findAll({
    include: [
      Authors,
      {
        model: Genres,
        where: {
          id: Number(genre_id),
        },
      },
    ],
  })
    .then((books) => {
      return res.json(books);
    })
    .catch((err) => {
      console.err(
        `Error fetching books within genre ${genre_id}: ${err.message} `,
      );
    });
});

//TODO implement the GET /api/books:id endpoint

app.post("/api/books", (req, res) => {
  const { name, price, stock, author_id } = req.body;
  if (!name || !price || !stock || !author_id) {
    return res.status(400).json({
      message: `Cannot create book :(`,
    });
  }

  Books.create({
    name,
    price,
    stock,
    author_id,
  })
    .then((book) => {
      return res.status(201).json(book);
    })
    .catch((err) => {
      console.error("Cannot create book", err);
      res.status(500).json({
        message: "Cannot create book " + err,
      });
    });
});

//TODO implement the PUT /api/books/:id endpoint
//TODO implement the DELETE /api/books/:id endpoint

//TODO implement the GET /api/genres endpoint
app.get("/api/genres", (req, res) => {
  Genres.findAll()
    .then((genres) => {
      res.json(genres);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Unable to fetch genres" + err.message,
      });
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
