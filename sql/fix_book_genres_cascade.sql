-- Fix: allow deleting a Book by cascading deletes to Book_Genres.
-- Run this once if the table was created by Sequelize without ON DELETE CASCADE.

ALTER TABLE public."Book_Genres"
  DROP CONSTRAINT IF EXISTS "Book_Genres_book_id_fkey",
  ADD CONSTRAINT "Book_Genres_book_id_fkey"
    FOREIGN KEY (book_id) REFERENCES public."Books"(id) ON DELETE CASCADE;

ALTER TABLE public."Book_Genres"
  DROP CONSTRAINT IF EXISTS "Book_Genres_genre_id_fkey",
  ADD CONSTRAINT "Book_Genres_genre_id_fkey"
    FOREIGN KEY (genre_id) REFERENCES public."Genres"(id) ON DELETE CASCADE;
