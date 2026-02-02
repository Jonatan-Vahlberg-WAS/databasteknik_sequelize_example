const Authors = require("./authors");
const Books = require("./books");
// TODO: Fetch the BookGenres models

// Many-to-many: Books <-> Genres through Book_Genres (required for include: [Genres] to work)
// TODO: Uncomment the following lines when the Genres and BookGenres models are created
// Books.belongsToMany(Genres, { through: BookGenres, foreignKey: "book_id" });
// Genres.belongsToMany(Books, { through: BookGenres, foreignKey: "genre_id" });

const models = {
  Authors,
  Books,
};

module.exports = models;
