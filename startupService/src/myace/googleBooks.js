export async function searchGoogleBooks(searchTerm) {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`
    );
    const data = await response.json();
  
    if (!data.items) return null;
  
    const book = data.items[0].volumeInfo;
    return {
      title: book.title || 'Untitled',
      author: (book.authors && book.authors[0]) || 'Unknown',
      description: book.description || 'No description available.',
      image: book.imageLinks?.thumbnail || '/blankBook.png',
    };
  }