const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('./sql/sequelize');
const { Authors, Books, Genres, BookGenres } = require('./sql/models');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/api/authors', (req, res) => {
    Authors.findAll()
    .then((authors) => {
        res.json(authors);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Unable to fetch authors' });
    });
});

app.get('/api/books', (req, res) => {
    Books.findAll({
        include: [
            Authors,
            { model: Genres, through: { attributes: [] } },  // through: { attributes: [] } hides junction columns in response
        ],
    })
    .then((books) => {
        res.json(books);
    })
    .catch((error) => {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Unable to fetch books' });
    });
});

app.get('/api/genres', (req, res) => {
    Genres.findAll()
    .then((genres) => {
        res.json(genres);
    })
    .catch((error) => {
        console.error('Error fetching genres:', error);
        res.status(500).json({ error: 'Unable to fetch genres' });
    });
});


app.listen(port, () => {
    sequelize.authenticate()
    .then(() => {
        sequelize.sync()
        .then(() => {
            console.log('Database and tables created!');
        })
        .catch((error) => {
            console.error('Error syncing database:', error);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database or sync tables:', error);
    });
});