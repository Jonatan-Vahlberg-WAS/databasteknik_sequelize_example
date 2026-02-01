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
        onDelete: 'CASCADE',
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Genres,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'Book_Genres',
    timestamps: true,
});

BookGenres.belongsTo(Books, { foreignKey: 'book_id', onDelete: 'CASCADE' });
BookGenres.belongsTo(Genres, { foreignKey: 'genre_id', onDelete: 'CASCADE' });
// Books/Genres ↔ junction: use belongsToMany in models.js; hasMany here would duplicate alias Book_Genres

module.exports = BookGenres;