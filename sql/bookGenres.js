const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const Books = require("./books");
const Genres = require("./genres");

//TODO implement the BookGenres model
const BookGenres = sequelize.define("BookGenres", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Books,
      key: "id",
    },
  },
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Genres,
      key: "id",
    },
  },
}, {
    tableName: "BookGenres",
    timestamps: true
});

BookGenres.belongsTo(Books, { foreignKey: "book_id", onDelete: "CASCADE"})
BookGenres.belongsTo(Genres, { foreignKey: "genre_id", onDelete: "CASCADE"})

module.exports = BookGenres