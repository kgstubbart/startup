import React from 'react';
import './myace.css';

export function MyAce({ searchTerm }) {
  return (
    <main className="container-fluid bg-book-paper text-center">
      <h2>{searchTerm}</h2>
      <h5>Author of {searchTerm}</h5>
      <img src="https://m.media-amazon.com/images/I/91U6rc7u0yL._AC_UF1000,1000_QL80_.jpg" alt="Book Title Cover" width="200" height="300"></img>
      <div>
          <button className="btn btn-gold">♦ My Ace ♦</button>
      </div>
      <p><b>Ace Tally: </b>0</p>
      <p>Summary of {searchTerm}</p>
    </main>
  );
}