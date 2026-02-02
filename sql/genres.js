const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Genres = sequelize.define("Genres", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'Genres',
    timestamps: true
})

module.exports = Genres
