const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Books = require('./books');
const Genres = require('./genres');

const BookGenres = sequelize.define('Book_Genres', {
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
            key: 'id',
        },
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Genres,
            key: 'id',
        },
    },
}, {
    tableName: 'Book_Genres',
    timestamps: true,
});

BookGenres.belongsTo(Books, { foreignKey: 'book_id' });
BookGenres.belongsTo(Genres, { foreignKey: 'genre_id' });
// Books/Genres ↔ junction: use belongsToMany in models.js; hasMany here would duplicate alias Book_Genres

module.exports = BookGenres;