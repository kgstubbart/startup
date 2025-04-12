import React from 'react';
import { NoBookView } from './NoBookView';
import { BookView } from './BookView';
import { searchGoogleBooks } from './googleBooks';

export function MyAce({ searchTerm, userName }) {
  const userAceBookId = React.useMemo(() => {
    const userAces = JSON.parse(localStorage.getItem('userAces') || '{}');
    return userAces[userName] || '';
  }, [userName]);

  const [bookData, setBookData] = React.useState(null);

  React.useEffect(() => {
    if (searchTerm) {
      searchGoogleBooks(searchTerm).then(setBookData);
    } else if (userAceBookId) {
      searchGoogleBooks(userAceBookId, true).then(result => {
        if (!result) {
          // fallback: try as a search term if fetch-by-ID fails
          searchGoogleBooks(userAceBookId).then(setBookData);
        } else {
          setBookData(result);
        }
      });
    }
  }, [searchTerm, userAceBookId]);

  if (!searchTerm && !userAceBookId) return <NoBookView />;
  if (!bookData) return <div>Loading or no book found...</div>;

return (
  <BookView
    bookId={bookData.id}
    bookTitle={bookData.title}
    author={bookData.author}
    image={bookData.image}
    summary={bookData.description}
    userName={userName}
  />
);
}