import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">
  <header className="container-fluid">
    <nav className="navbar fixed-top navbar-dark bg-dark">
      <a className="navbar-brand fs-2 library-brand" href="#">Library Ace</a>
        <menu className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" href="index.html">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="myace.html">MyAce</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="rankings.html">Rankings</a>
          </li>
        </menu>
    </nav>
  </header>

  <main className="container-fluid bg-book-paper text-center">App compnents go here</main>

  <footer className="bg-dark text-white-50">
    <div className="container-fluid">
        <span className="text-reset">Kason Stubbart</span>
        <a className="text-reset" href="https://github.com/kgstubbart/startup">Library Ace GitHub</a>
    </div>
  </footer>
</div>;
}