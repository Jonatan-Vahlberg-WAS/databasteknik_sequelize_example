CREATE TABLE Authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year_of_birth INTEGER -- För Uppgift 4/Sequelize
);

CREATE TABLE Genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 10.00 CHECK (price >= 10.00), -- Uppgift 1
    stock INTEGER DEFAULT 5 CHECK (stock >= 0),
    author_id INTEGER REFERENCES Authors(id) ON DELETE CASCADE
);

CREATE TABLE Book_Genres (
    book_id INTEGER REFERENCES Books(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES Genres(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, genre_id)
);
