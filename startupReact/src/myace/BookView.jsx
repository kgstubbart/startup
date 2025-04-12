import React from 'react';
import './myace.css';

export function BookView({ bookTitle, userAceBook, setUserAceBook }) {
    const [aceTally, setAceTally] = React.useState(() => {
        const tallies = JSON.parse(localStorage.getItem('bookTallies') || '{}');
        return tallies[bookTitle] || 0;
    });

    const isThisBookAced = bookTitle === userAceBook;

    const handleAceClick = () => {
    if (!bookTitle || isThisBookAced) return;

    const tallies = JSON.parse(localStorage.getItem('bookTallies') || '{}');

    if (userAceBook && tallies[userAceBook]) {
        tallies[userAceBook] -= 1;
    }

    if (!tallies[bookTitle]) {
        tallies[bookTitle] = 1;
    } else {
        tallies[bookTitle] += 1;
    }

    localStorage.setItem('bookTallies', JSON.stringify(tallies));
    localStorage.setItem('userAceBook', bookTitle);

    setUserAceBook(bookTitle);
    setAceTally(tallies[bookTitle]);
    };

    return (
    <main className="container-fluid bg-book-paper text-center">
        <h2>{bookTitle}</h2>
        <h5>Author of {bookTitle}</h5>
        <img src="/blankBook.png" alt="Book Cover" width="200" height="200" />

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