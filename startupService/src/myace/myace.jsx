import React from 'react';
import { NoBookView } from './NoBookView';
import { BookView } from './BookView';
import { searchGoogleBooks } from './googleBooks';

export function MyAce({ searchTerm, userName }) {
  const [userAceBook, setUserAceBook] = React.useState(() => localStorage.getItem('userAceBook') || '');
  const activeBook = searchTerm || userAceBook;
  const [bookData, setBookData] = React.useState(null);

  React.useEffect(() => {
    if (!activeSearch) return;

    searchGoogleBooks(activeSearch).then((result) => {
      setBookData(result);
    });
  }, [activeSearch]);

  if (!activeSearch || !bookData) {
    return <NoBookView />;
  }
  

  return (
    <BookView
      bookTitle={activeBook}
      author={bookData.author}
      image={bookData.image}
      summary={bookData.description}
      userName={userName}
    />
  );
}