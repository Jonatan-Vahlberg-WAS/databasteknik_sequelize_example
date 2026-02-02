const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const Books = require("./books");
const Genres = require("./genres");

//BookGenres.belongsTo(Books, { foreignKey: "book_id", onDelete: "CASCADE"})
//BookGenres.belongsTo(Genres, { foreignKey: "genre_id", onDelete: "CASCADE"})

//module.exports = BookGenres