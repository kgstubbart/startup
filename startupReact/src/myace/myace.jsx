import React from 'react';
import './myace.css';

export function MyAce({ searchTerm }) {
  return (
    <main className="container-fluid bg-book-paper text-center">
      <h2>{searchTerm}</h2>
      <h5>Author of {searchTerm}</h5>
      <img src="/blankBook.png" alt="Logo" width="300" height="300" />
      <div>
          <button className="btn btn-gold">♦ My Ace ♦</button>
      </div>
      <p><b>Ace Tally: </b>0</p>
      <p>Summary of {searchTerm}</p>
    </main>
  );
}