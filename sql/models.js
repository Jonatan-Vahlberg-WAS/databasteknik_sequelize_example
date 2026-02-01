const Authors = require('./authors');
const Books = require('./books');
const Genres = require('./genres');
const BookGenres = require('./bookGenres');

// Many-to-many: Books <-> Genres through Book_Genres (required for include: [Genres] to work)
Books.belongsToMany(Genres, { through: BookGenres, foreignKey: 'book_id' });
Genres.belongsToMany(Books, { through: BookGenres, foreignKey: 'genre_id' });

const models = {
    Authors,
    Books,
    Genres,
    BookGenres,
};

module.exports = models;