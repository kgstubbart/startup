import React from 'react';
import './myace.css';

export function BookView({ bookTitle, userAceBook, setUserAceBook, aceTally, setAceTally }) {
  const isThisBookAced = bookTitle === userAceBook;

  const handleAceClick = () => {
    if (!bookTitle || isThisBookAced) return;

    if (userAceBook && userAceBook !== bookTitle) {
      console.log(`Removed ace from: ${userAceBook}`);
    }

    setUserAceBook(bookTitle);
    localStorage.setItem('userAceBook', bookTitle);
    setAceTally(prev => prev + 1);
  };

  return (
    <main className="container-fluid bg-book-paper text-center">
      <h2>{bookTitle}</h2>
      <h5>Author of {bookTitle}</h5>
      <img src="/blankBook.png" alt="BlnBook Cover" width="200" height="200" />

      <div className="mt-3">
        <button 
          className="btn btn-gold" 
          onClick={handleAceClick}
          disabled={isThisBookAced}
        >
          ♦ My Ace ♦
        </button>
      </div>

      <p><b>Ace Tally: </b>{aceTally}</p>
      <p className="text-start px-3">Summary of {bookTitle}</p>
    </main>
  );
}