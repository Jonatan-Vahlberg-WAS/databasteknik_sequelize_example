# Library API – Sequelize example

A small backend API for books, authors, and genres, built with **Express** and **Sequelize** and a **PostgreSQL** database. There is also a simple static frontend so you can see the data in the browser.

If you are new to this project: start with **Prerequisites** and **First time setup**, then run the app. Use **Backend packages** when you want to understand what each dependency does, and **Tasks** as your exercise list.

You can find the solution code in the `solution-code` branch switch to it either in browser or by running: 
`git checkout solution-code` in the terminal.

---

## Prerequisites

Before you start, make sure you have:

- **Node.js** installed (e.g. from [nodejs.org](https://nodejs.org)).
- **PostgreSQL** installed and running. You need a database (the app expects one named `library_v7` by default; you can create it in pgAdmin or with `createdb library_v7` in the terminal).

---

## First time setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create the database** (if it does not exist yet). In PostgreSQL, create a database named `library_v7`, or use your own name and set the `DB_NAME` environment variable (see below).

3. **Optional: configure the database**  
   The app uses these environment variables (these are the defaults):

   | Variable     | Default      |
   |-------------|--------------|
   | `DB_NAME`   | `library_v7` |
   | `DB_USER`   | `postgres`   |
   | `DB_PASSWORD` | `postgres` |
   | `DB_HOST`   | `localhost`  |
   | `DB_PORT`   | `5432`       |

   If your PostgreSQL user, password, or database name is different, set these (e.g. in a `.env` file or in your shell).

4. **Seed the database (first time only)**  
   If the tables are empty, run the seed script so the app has data. You can run the SQL in `sql/SEED_DATA.sql` in pgAdmin (or with `psql`) after the tables have been created (e.g. by starting the app once so Sequelize creates them).

5. **Start the server**
   ```bash
   npm start
   ```
   Or, to auto-restart on file changes:
   ```bash
   npm run dev
   ```

6. **Open the frontend** in your browser: [http://localhost:3000/](http://localhost:3000/)

If the server starts without errors, you should see “Database and tables created!” (or similar) in the terminal and the library page in the browser.

---

## Run (after setup)

```bash
npm start
# or
npm run dev
```

- **Frontend:** [http://localhost:3000/](http://localhost:3000/)
- **API base:** `http://localhost:3000/api` (see list below)

---

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/authors`  | List all authors |
| POST   | `/api/authors`  | Create an author |
| GET    | `/api/books`    | List all books (with author and genres) |
| GET    | `/api/genres`   | List all genres |
| POST   | `/api/books`    | To be added… |
| more   | …               | To be added… |

---

## Backend packages

These are the npm packages the backend uses (see `package.json`):

| Package     | Purpose |
|------------|---------|
| **express** | Web framework: routes, middleware, and serving the API and the static frontend. |
| **sequelize** | ORM (Object–Relational Mapping): defines models (Authors, Books, Genres, etc.) and runs queries for you instead of writing raw SQL. |
| **pg** | PostgreSQL driver. Sequelize uses it to talk to the database. |
| **pg-hstore** | Converts data for PostgreSQL; required by Sequelize when using the `pg` dialect. |
| **cors** | Lets the API be called from another origin (e.g. a different port or `frontend_external.html`). |

**Dev dependency:**

| Package   | Purpose |
|----------|---------|
| **nodemon** | Restarts the server when you change a file, so you don’t have to stop and start it yourself. Used when you run `npm run dev`. |

### Where they are used

- **server.js** – `express`, `path`, `cors`; and it loads `./sql/sequelize` and `./sql/models`.
- **sql/sequelize.js** – creates the Sequelize instance (connection to the database).
- **sql/** (authors, books, genres, bookGenres, models) – use `sequelize` (e.g. `DataTypes`, `define`) and require each other. Sequelize itself uses **pg** and **pg-hstore** when talking to PostgreSQL.

---

## Troubleshooting

- **“Connection refused” or “ECONNREFUSED”**  
  PostgreSQL is probably not running, or `DB_HOST` / `DB_PORT` are wrong. Start PostgreSQL and check that the host and port match your setup.

- **“database … does not exist”**  
  Create the database (e.g. `library_v7`) in PostgreSQL, or set `DB_NAME` to a database that already exists.

- **“password authentication failed”**  
  Check `DB_USER` and `DB_PASSWORD`; they must match your PostgreSQL user.

- **Frontend is blank or “Unable to fetch”**  
  Make sure the server is running and you open [http://localhost:3000/](http://localhost:3000/) (not the file path). If you use `frontend_external.html` from another origin, the server must allow CORS (the app already uses the `cors` package).

---

## Tasks

- [ ] Add `Genres` and `BookGenres` models and associations
    hint: When adding the associations, use the `onDelete: 'CASCADE'` option to ensure that when a book or genre is deleted, the corresponding rows in the junction table are also deleted.
- [ ] Add a `Genres` API endpoint `GET /api/genres`


- [ ] Add a `GET /api/books` endpoint to include the Author
    hint: `include: [Authors]`
- [ ] Add a `GET /api/books/:id` endpoint to get a single book
    hint: `params: { id }`
    hint 2: [Finding Records](https://sequelize.org/docs/v7/querying/select-in-depth/#applying-where-clauses)
- [ ] Update the `GET /api/books` endpoint to include the Genres
    hint: `include: [..., { model: Genres, through: { attributes: [] } }]`
- [ ] Test the frontend to see if both genres and books are displayed properly

- [ ] Add a `POST /api/books` endpoint to create a new book
    hint: `body: { name, price, stock, author_id }`
    hint 2: [Inserting Records](https://sequelize.org/docs/v7/querying/insert/#inserting-a-single-entity)
    hint 2:  look at the `POST /api/authors` endpoint for inspiration
    - [ ] Hard challange in the creation of the book add the genres that you take in from the `body: { ..., genres }` by creating a new `BookGenres` rows.
        hint: [Inserting Associated Records](https://sequelize.org/docs/v7/querying/insert/#inserting-associated-records)

- [ ] Test the frontend to see if the new book is created properly
- [ ] Add a `PUT /api/books/:id` endpoint to update a book
    hint: The update request is really just a `GET`and a `POST` request combined.
    hint 2: [Updating Records](https://sequelize.org/docs/v7/querying/update/)
    hint: `body: { name, price, stock, author_id }`
    - [ ] Very Hard challange in the update of the book add the genres that you take in from the `body: { ..., genres }` by first deleting the existing genres and then adding the new ones.

- [ ] Add a `DELETE /api/books/:id` endpoint to delete a book
    hint: [Deleting Records](https://sequelize.org/docs/v7/querying/delete/)