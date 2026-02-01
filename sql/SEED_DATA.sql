TRUNCATE TABLE public."Authors" CASCADE;
TRUNCATE TABLE public."Genres" CASCADE;
TRUNCATE TABLE public."Books" CASCADE;
TRUNCATE TABLE public."Book_Genres" CASCADE;

-- Författare (Nu med födelseår)
INSERT INTO public."Authors" (id, name, year_of_birth, "createdAt", "updatedAt") VALUES
(1, 'Astrid Lindgren', 1907, NOW(), NOW()), (2, 'Fredrik Backman', 1981, NOW(), NOW()), (3, 'Karin Smirnoff', 1964, NOW(), NOW()),
(4, 'Håkan Nesser', 1950, NOW(), NOW()), (5, 'Alex Schulman', 1976, NOW(), NOW()), (6, 'Stephen King', 1947, NOW(), NOW()),
(7, 'J.K. Rowling', 1965, NOW(), NOW()), (8, 'George R.R. Martin', 1948, NOW(), NOW()), (9, 'Agatha Christie', 1890, NOW(), NOW()),
(10, 'Ernest Hemingway', 1899, NOW(), NOW()), (11, 'Haruki Murakami', 1949, NOW(), NOW()), (12, 'Tove Jansson', 1914, NOW(), NOW()),
(13, 'Vilhelm Moberg', 1898, NOW(), NOW()), (14, 'August Strindberg', 1849, NOW(), NOW()), (15, 'Camilla Läckberg', 1974, NOW(), NOW());

-- Genrer
INSERT INTO public."Genres" (id, name, "createdAt", "updatedAt") VALUES
(1, 'Barnlitteratur', NOW(), NOW()), (2, 'Drama', NOW(), NOW()), (3, 'Kriminalroman', NOW(), NOW()),
(4, 'Fantasy', NOW(), NOW()), (5, 'Klassiker', NOW(), NOW()), (6, 'Skräck', NOW(), NOW()),
(7, 'Thriller', NOW(), NOW()), (8, 'Historisk roman', NOW(), NOW()), (9, 'Mysterium', NOW(), NOW()),
(10, 'Magisk realism', NOW(), NOW());

-- Böcker (Obs: Price måste vara >= 10.00 pga constraint)
INSERT INTO public."Books" (id, name, price, stock, author_id, "createdAt", "updatedAt") VALUES
(1, 'Pippi Långstrump', 149.00, 10, 1, NOW(), NOW()),
(2, 'Bröderna Lejonhjärta', 189.50, 5, 1, NOW(), NOW()),
(3, 'Ronja Rövardotter', 175.00, 7, 1, NOW(), NOW()),
(4, 'En man som heter Ove', 129.00, 3, 2, NOW(), NOW()),
(5, 'Björnstad', 210.00, 4, 2, NOW(), NOW()),
(6, 'The Shining', 155.00, 2, 6, NOW(), NOW()),
(7, 'It', 249.00, 5, 6, NOW(), NOW()),
(8, 'Pet Sematary', 145.00, 3, 6, NOW(), NOW()),
(9, 'Harry Potter och de vises sten', 299.00, 8, 7, NOW(), NOW()),
(10, 'A Game of Thrones', 320.00, 4, 8, NOW(), NOW()),
(11, 'Mordet på Orientexpressen', 99.00, 6, 9, NOW(), NOW()),
(12, 'Och så var de bara en', 115.00, 4, 9, NOW(), NOW()),
(13, 'Den gamle och havet', 85.00, 3, 10, NOW(), NOW()),
(14, 'Norwegian Wood', 160.00, 2, 11, NOW(), NOW()),
(15, 'Kafka på stranden', 195.00, 3, 11, NOW(), NOW()),
(16, 'Isprinsessan', 199.00, 5, 15, NOW(), NOW()),
(17, 'Överlevarna', 185.00, 4, 5, NOW(), NOW());

-- Kopplingar Bok <-> Genre
INSERT INTO public."Book_Genres" (book_id, genre_id, "createdAt", "updatedAt") VALUES
(1, 1, NOW(), NOW()), (1, 5, NOW(), NOW()), (2, 1, NOW(), NOW()), (2, 4, NOW(), NOW()), (3, 1, NOW(), NOW()), (4, 2, NOW(), NOW()), (5, 2, NOW(), NOW()), (6, 6, NOW(), NOW()), (7, 6, NOW(), NOW()), (9, 4, NOW(), NOW()), (10, 4, NOW(), NOW()), (11, 3, NOW(), NOW()), (11, 9, NOW(), NOW()), (13, 5, NOW(), NOW()), (14, 2, NOW(), NOW()), (15, 10, NOW(), NOW()), (16, 3, NOW(), NOW()), (17, 2, NOW(), NOW());

-- Reset auto-increment sequence (quoted table names for case-sensitive PostgreSQL identifiers)
SELECT setval(pg_get_serial_sequence('public."Authors"', 'id'), (SELECT MAX(id) FROM public."Authors"));
SELECT setval(pg_get_serial_sequence('public."Books"', 'id'), (SELECT MAX(id) FROM public."Books"));
SELECT setval(pg_get_serial_sequence('public."Genres"', 'id'), (SELECT MAX(id) FROM public."Genres"));
SELECT setval(pg_get_serial_sequence('public."Book_Genres"', 'id'), (SELECT MAX(id) FROM public."Book_Genres"));