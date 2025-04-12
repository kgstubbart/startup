export async function searchGoogleBooks(searchTermOrId, isId = false) {
    const url = isId
      ? `https://www.googleapis.com/books/v1/volumes/${searchTermOrId}`
      : `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTermOrId)}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Fetch failed with status ${response.status}`);
      
      const data = await response.json();
  
      const book = isId ? data.volumeInfo : data.items?.[0]?.volumeInfo;
      const id = isId ? data.id : data.items?.[0]?.id;
  
      if (!book || !id) return null;
  
      return {
        id,
        title: book.title || 'Untitled',
        author: (book.authors && book.authors[0]) || 'Unknown',
        description: book.description || 'No description available.',
        image: book.imageLinks?.thumbnail || '/blankBook.png',
      };
    } catch (err) {
      console.error("Error fetching book:", err);
      return null;
    }
  }