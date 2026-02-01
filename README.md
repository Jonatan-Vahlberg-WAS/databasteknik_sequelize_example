# Library API – Sequelize example

A small backend API for books, authors, and genres, using Express and Sequelize with PostgreSQL. Includes a simple static frontend.

## Backend packages

These are the npm packages used by the backend (see `package.json`):

| Package     | Purpose |
|------------|---------|
| **express** | Web framework: routing, middleware, serving the API and static frontend. |
| **sequelize** | ORM: models, associations, and queries for PostgreSQL. |
| **pg** | PostgreSQL client; used by Sequelize to talk to the database. |
| **pg-hstore** | Converts JS objects to/from PostgreSQL hstore; required by Sequelize for the `pg` dialect. |
| **cors** | CORS middleware so the API can be called from other origins (e.g. `frontend_external.html`). |

**Dev dependency:**

| Package   | Purpose |
|----------|---------|
| **nodemon** | Restarts the server on file changes when you run `npm run dev`. |

### Where they are used

- **server.js**: `express`, `path`, `cors`; loads `./sql/sequelize` and `./sql/models`.
- **sql/sequelize.js**: `sequelize` (Sequelize constructor).
- **sql/** (authors, books, genres, bookGenres, models): `sequelize` (DataTypes, `define`), and internal model requires. Sequelize uses **pg** and **pg-hstore** under the hood when connecting to PostgreSQL.

## Prerequisites

- Node.js
- PostgreSQL (running, with a database e.g. `library_v7`)

## Setup

```bash
npm install
```

Configure the database via environment variables (optional; defaults shown):

- `DB_NAME` (default: `library_v7`)
- `DB_USER` (default: `postgres`)
- `DB_PASSWORD` (default: `postgres`)
- `DB_HOST` (default: `localhost`)
- `DB_PORT` (default: `5432`)

Create the schema and use seed data if it is first time running the application.

## Run

```bash
npm start
# or, with auto-restart:
npm run dev
```

Server runs at `http://localhost:3000` (or the port set by `PORT`).

- **Frontend:** `http://localhost:3000/`

- **API:**
```
GET /api/authors
GET /api/books
GET /api/genres
more to be added...
```