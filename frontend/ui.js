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