import React from 'react';
import { NoBookView } from './NoBookView';
import { BookView } from './BookView';

export function MyAce({ searchTerm, userName }) {
  const [userAceBook, setUserAceBook] = React.useState(() => localStorage.getItem('userAceBook') || '');
  const activeBook = searchTerm || userAceBook;

  if (!activeBook) {
    return <NoBookView />;
  }
  

  return (
    <BookView
      bookTitle={activeBook}
      userName={userName}
    />
  );
}