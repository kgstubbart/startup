import React from 'react';
import './myace.css';

export function BookView({ bookTitle, author, image, summary, userName }) {
  const [aceTally, setAceTally] = React.useState(() => {
    const tallies = JSON.parse(localStorage.getItem('bookTallies') || '{}');
    return tallies[bookTitle] || 0;
  });

  const [userAceBook, setUserAceBook] = React.useState(() => {
    const userAces = JSON.parse(localStorage.getItem('userAces') || '{}');
    return userAces[userName] || '';
  });

  const isThisBookAced = bookTitle === userAceBook;

  const handleAceClick = () => {
    if (!bookTitle || isThisBookAced) return;

    const tallies = JSON.parse(localStorage.getItem('bookTallies') || '{}');
    const userAces = JSON.parse(localStorage.getItem('userAces') || '{}');

    const prevBook = userAces[userName];
    if (prevBook && tallies[prevBook]) {
      tallies[prevBook] = Math.max(tallies[prevBook] - 1, 0);
    }

    tallies[bookTitle] = (tallies[bookTitle] || 0) + 1;

    userAces[userName] = bookTitle;

    localStorage.setItem('bookTallies', JSON.stringify(tallies));
    localStorage.setItem('userAces', JSON.stringify(userAces));

    setAceTally(tallies[bookTitle]);
    setUserAceBook(bookTitle);
  };

  React.useEffect(() => {
    const tallies = JSON.parse(localStorage.getItem('bookTallies') || '{}');
    setAceTally(tallies[bookTitle] || 0);
  }, [bookTitle]);

  return (
    <main className="container-fluid bg-book-paper text-center">
      <h2>{bookTitle}</h2>
      <h5>{author}</h5>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={image}
          alt={bookTitle}
          style={{ transform: 'scale(1.5)', transformOrigin: 'top center' }}
        />
      </div>

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
      <p className="text-start px-3">{summary}</p>
    </main>
  );
}