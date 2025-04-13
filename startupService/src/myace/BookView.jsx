import React from 'react';
import './myace.css';

export function BookView({ bookId, bookTitle, author, image, summary, userName }) {
  const [aceTally, setAceTally] = React.useState(() => {
    const tallies = JSON.parse(localStorage.getItem('bookTallies') || '{}');
    return tallies[bookId] || 0;
  });

  const [userAceBookId, setUserAceBookId] = React.useState(() => {
    const userAces = JSON.parse(localStorage.getItem('userAces') || '{}');
    return userAces[userName] || '';
  });

  const isThisBookAced = bookId === userAceBookId;

  const handleAceClick = () => {
    if (!bookId || isThisBookAced) return;

    const tallies = JSON.parse(localStorage.getItem('bookTallies') || '{}');
    const userAces = JSON.parse(localStorage.getItem('userAces') || '{}');

    const prevBookId = userAces[userName];
    if (prevBookId && tallies[prevBookId]) {
      tallies[prevBookId] = Math.max(tallies[prevBookId] - 1, 0);
    }

    tallies[bookId] = (tallies[bookId] || 0) + 1;
    userAces[userName] = bookId;

    localStorage.setItem('bookTallies', JSON.stringify(tallies));
    localStorage.setItem('userAces', JSON.stringify(userAces));

    setAceTally(tallies[bookId]);
    setUserAceBookId(bookId);
  };

  React.useEffect(() => {
    const tallies = JSON.parse(localStorage.getItem('bookTallies') || '{}');
    setAceTally(tallies[bookId] || 0);
  }, [bookId]);

  return (
    <main className="container-fluid bg-book-paper text-center">
      <h2>{bookTitle}</h2>
      <h5>{author}</h5>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={image}
          alt={bookTitle}
        />
      </div>

      <div className="mt-3 mb-2">
        <button 
          className="btn btn-gold" 
          onClick={handleAceClick}
          disabled={isThisBookAced}
        >
          ♦ My Ace ♦
        </button>
      </div>

      <p><b>Ace Tally: </b>{aceTally}</p>
      
      <p className="text-start px-3">
        {stripHTML(summary)}
      </p>
    </main>
  );
}

function stripHTML(htmlString) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || '';
}