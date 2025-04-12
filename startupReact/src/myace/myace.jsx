import React from 'react';
import { NoBookView } from './NoBookView';
import { BookView } from './BookView';

export function MyAce({ searchTerm }) {
  const [userAceBook, setUserAceBook] = React.useState(() => localStorage.getItem('userAceBook') || '');
  const [aceTally, setAceTally] = React.useState(0);
  const activeBook = searchTerm || userAceBook;

  if (!activeBook) {
    return <NoBookView />;
  }
  

  return (
    <BookView
      bookTitle={activeBook}
      userAceBook={userAceBook}
      setUserAceBook={setUserAceBook}
    />
  );
}