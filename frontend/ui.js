const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

const renderGenres = (genres = []) => {
    const genresList = document.getElementById('genres');
    genresList.innerHTML = genres.length
        ? genres.map(g => `<li>${escapeHtml(g.name)}</li>`).join('')
        : '<li>Inga genrer.</li>';

}


const renderBooks = (books = []) => {
    const booksList = document.getElementById('books');
    booksList.innerHTML = books.length
        ? books.map(b => {
            const author = b.Author ? b.Author.name : '—';
            const genres = (b.Genres || []).map(g => g.name).join(', ') || '—';
            return `<li><strong>${escapeHtml(b.name)}</strong><div class="author">${escapeHtml(author)}</div><div class="genres">${escapeHtml(genres)}</div></li>`;
        }).join('')
        : '<li>Inga böcker.</li>';
}

const renderBookForm = (authors = []) => {
    const authorSelect = document.getElementById('book-author');
    if (!authorSelect) return;
    const options = authors.length
        ? ['<option value="">Välj författare</option>', ...authors.map(a => `<option value="${a.id}">${escapeHtml(a.name)}</option>`)].join('')
        : '<option value="">Inga författare</option>';
    authorSelect.innerHTML = options;
};

/**
 * Fetches authors, fills the book form author dropdown, and attaches submit handler to create a book.
 * Call once when the page is ready. Requires GET /api/authors and POST /api/books to be implemented.
 * @param {string} apiBase - Base URL for the API (e.g. '/api' or 'http://localhost:3000/api')
 * @param {{ onSuccess?: () => void }} options - onSuccess called after a book is created (e.g. refresh book list)
 */
const initBookForm = (apiBase, options = {}) => {
    const form = document.getElementById('book-form');
    const authorSelect = document.getElementById('book-author');
    if (!form || !authorSelect) return;

    const onSuccess = options.onSuccess || (() => { });

    fetch(`${apiBase}/authors`)
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then(authors => {
            renderBookForm(authors);
        })
        .catch(err => {
            authorSelect.innerHTML = `<option value="">Kunde inte ladda författare</option>`;
            console.error('Error loading authors:', err);
        });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('[name="name"]')?.value?.trim();
        const price = form.querySelector('[name="price"]')?.value?.trim();
        const stock = form.querySelector('[name="stock"]')?.value?.trim();
        const author_id = authorSelect.value;

        if (!name || !price || !stock || !author_id) {
            alert('Fyll i namn, pris, antal och författare.');
            return;
        }

        const payload = {
            name,
            price: parseFloat(price),
            stock: parseInt(stock, 10),
            author_id: parseInt(author_id, 10),
        };

        fetch(`${apiBase}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(res => {
                if (!res.ok) return res.json().then(body => Promise.reject(new Error(body.error || res.statusText)));
                return res.json();
            })
            .then(() => {
                form.reset();
                onSuccess();
            })
            .catch(err => {
                console.error('Error creating book:', err);
                alert('Kunde inte skapa bok: ' + err.message);
            });
    });
};