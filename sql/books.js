const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Authors = require('./authors');

const Books = sequelize.define('Books', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Authors,
            key: 'id',
        },
    },
}, {
    tableName: 'Books',
    timestamps: true,
});

Books.belongsTo(Authors, { foreignKey: 'author_id', onDelete: 'CASCADE' });
Authors.hasMany(Books, { foreignKey: 'author_id'});

module.exports = Books;