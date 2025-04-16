import React from 'react';
import './myace.css';
import { RankingsNotifier } from '../rankings/rankingsNotifier';

export function BookView({ bookId, bookTitle, author, image, summary, userName }) {
  const [aceTally, setAceTally] = React.useState(0);
  const [userAceBookId, setUserAceBookId] = React.useState(() => {
    const userAces = JSON.parse(localStorage.getItem('userAces') || '{}');
    return userAces[userName] || '';
  });

  const isThisBookAced = bookId === userAceBookId;

  const handleAceClick = async () => {
    if (!bookId || isThisBookAced) return;

    const userAces = JSON.parse(localStorage.getItem('userAces') || '{}');
    const bookMeta = JSON.parse(localStorage.getItem('bookMeta') || '{}');

    userAces[userName] = bookId;
    bookMeta[bookId] = { title: bookTitle, author };

    localStorage.setItem('userAces', JSON.stringify(userAces));
    localStorage.setItem('bookMeta', JSON.stringify(bookMeta));
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

      if (res.ok) {
        RankingsNotifier.broadcastEvent(userName, bookTitle);
        fetchTally();
      } else {
        console.error('Backend ace submission failed');
      }
    } catch (err) {
      console.error('Error calling /api/ace:', err);
    }
  };

  const fetchTally = async () => {
    try {
      const res = await fetch('/api/aces', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        const match = data.find((b) => b.id === bookId);
        setAceTally(match ? match.count : 0);
      }
    } catch (err) {
      console.error('Failed to fetch tally from server:', err);
    }
  };

  React.useEffect(() => {
    fetchTally();
  }, [bookId]);

  return (
    <main className="container-fluid bg-book-paper text-center py-4">
      <div>
        <div>
          <h1>{bookTitle}</h1>
          <h4>{author}</h4>
        </div>

        <div className="book-image-wrapper mb-4">
          <img src={image} alt={bookTitle} />
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