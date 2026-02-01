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


//? AUTHORS API ENDPOINTS
app.get('/api/authors', (req, res) => {
    Authors.findAll()
    .then((authors) => {
        res.json(authors);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Unable to fetch authors' });
    });
});

app.post('/api/authors', (req, res) => {
    const { name, year_of_birth } = req.body;
    if(!name || !year_of_birth) {
        return res.status(400).json({ error: 'Name and year of birth are required' });
    }
    Authors.create({ name, year_of_birth })
    .then((author) => {
        res.status(201).json(author);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Unable to create author' });
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

app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;
    Books.findByPk(id, {
        include: [
            Authors,
            { model: Genres, through: { attributes: [] } },
        ],
    })
    .then((book) => {
        res.json(book);
    })
    .catch((error) => {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Unable to fetch book' });
    });
});

app.post('/api/books', (req, res) => {
    const { name, price, stock, author_id, genres } = req.body;
    if(!name || !price || !stock || !author_id) {
        return res.status(400).json({ error: 'Name, price, stock, and author_id are required' });
    }
    Books.create({ name, price, stock, author_id })
    .then((book) => {

        const onSuccess = (book) => {
            res.status(201).json(book);
        };
        if(genres && genres.length > 0) {
            BookGenres.bulkCreate(genres.map(genre => ({ book_id: book.id, genre_id: genre })))
            .then(() => {
                onSuccess(book);
            })
            .catch((error) => {
                console.error('Error adding genres to book:', error);
                res.status(500).json({ error: 'Unable to add genres to book' });
                onSuccess(book);
            });
        }
        else {
            onSuccess(book);
        }
    })
    .catch((error) => {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Unable to create book' });
    });
});

app.put('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, stock, author_id, genres } = req.body;
    if(!name || !price || !stock || !author_id) {
        return res.status(400).json({ error: 'Name, price, stock, and author_id are required' });
    }
    Books.update({ name, price, stock, author_id }, { where: { id } })
    .then(([rowsUpdated]) => {
        if(rowsUpdated === 0) { 
            return res.status(404).json({ error: 'Book not found' });
        }
        const onSuccess = () => {
            res.status(200).json({ message: 'Book updated' });
        };
        if(genres && genres.length > 0) {

            // Very hard to add the genres directly in the update request. Since we neeed to check if the genres are already in the database and if not, add them.
            // So we will delete the existing genres and add the new ones.
            BookGenres.destroy({ where: { book_id: id } })
            .then(() => {
                return BookGenres.bulkCreate(genres.map(genre => ({ book_id: id, genre_id: genre })))
                .then(() => {
                    onSuccess();
                })
                .catch((error) => {
                    console.error('Error adding genres to book:', error);
                    res.status(500).json({ error: 'Unable to add genres to book' });
                    onSuccess();
                });
            })
            .then(() => {
                onSuccess();
            })
        }
        else {
            onSuccess();
        }
    })
    .catch((error) => {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Unable to update book' });
    });
});

app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    Books.destroy({ where: { id } })
    .then((rowsDeleted) => {
        if(rowsDeleted === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted' });
    })
    .catch((error) => {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Unable to delete book' });
    });
});


//? GENRES API ENDPOINTS
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