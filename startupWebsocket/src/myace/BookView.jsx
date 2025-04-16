import React from 'react';
import './myace.css';
import { RankingsNotifier } from '../rankings/rankingsNotifier';

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

  const handleAceClick = async () => {
    if (!bookId || isThisBookAced) return;
  
    const tallies = JSON.parse(localStorage.getItem('bookTallies') || '{}');
    const userAces = JSON.parse(localStorage.getItem('userAces') || '{}');
    const bookMeta = JSON.parse(localStorage.getItem('bookMeta') || '{}');
  
    const prevBookId = userAces[userName];
    if (prevBookId && tallies[prevBookId]) {
      tallies[prevBookId] = Math.max(tallies[prevBookId] - 1, 0);
    }
  
    tallies[bookId] = (tallies[bookId] || 0) + 1;
    userAces[userName] = bookId;
    bookMeta[bookId] = { title: bookTitle, author };
  
    localStorage.setItem('bookTallies', JSON.stringify(tallies));
    localStorage.setItem('userAces', JSON.stringify(userAces));
    localStorage.setItem('bookMeta', JSON.stringify(bookMeta));
  
    setAceTally(tallies[bookId]);
    setUserAceBookId(bookId);
  
    try {
      const res = await fetch('/api/ace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          bookId,
          title: bookTitle,
          author,
        }),
      });
  
      if (!res.ok) {
        RankingsNotifier.broadcastEvent(userName, bookTitle);
      } else {
        console.error('Backend ace submission failed');
      }
    } catch (err) {
      console.error('Error calling /api/ace:', err);
    }
  };

  React.useEffect(() => {
    const tallies = JSON.parse(localStorage.getItem('bookTallies') || '{}');
    setAceTally(tallies[bookId] || 0);
  }, [bookId]);

  return (
    <main className="container-fluid bg-book-paper text-center py-4">
      <div>
      <div>
        <h1>{bookTitle}</h1>
        <h4>{author}</h4>
      </div>

      <div className="book-image-wrapper mb-4">
        <img
          src={image}
          alt={bookTitle}
        />
      </div>

      <div className="mb-3">
        <button 
          className="btn btn-gold" 
          onClick={handleAceClick}
          disabled={isThisBookAced}
        >
          ♦ My Ace ♦
        </button>
        <p className="mt-2"><b>Ace Tally: </b>{aceTally}</p>
      </div>

      <div className="summary-text px-3">
        <p>{stripHTML(summary)}</p>
      </div>
      </div>
    </main>
  );
}

function stripHTML(htmlString) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || '';
}