import React from 'react';
import { BrowserRouter, NavLink, useLocation, Route, Routes } from 'react-router-dom';
import { AuthState } from './login/authState';

export function Header() {
  const location = useLocation();
  const isMyAce = location.pathname === '/myace';
  const isRankings = location.pathname === '/rankings';

  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <header className="container-fluid">
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <NavLink className="navbar-brand fs-2 library-brand" to="#">
          Library Ace
        </NavLink>
        <menu className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Login</NavLink>
          </li>
          {authState === AuthState.Authenticated && (
            <li className='nav-item'>
              <NavLink className='nav-link' to='myace'>
                MyAce
              </NavLink>
            </li>
          )}
          {authState === AuthState.Authenticated && (
            <li className='nav-item'>
              <NavLink className='nav-link' to='rankings'>
                Rankings
              </NavLink>
            </li>
          )}
        </menu>
        {isMyAce && (
          <>
            <form className="search-form" method="get" action="/myace">
              <div className="input-group">
                <span className="input-group-text">🔍</span>
                <input className="form-control" type="text" placeholder="Search library" />
                <button className="btn btn-primary" type="submit">Search</button>
              </div>
            </form>
            <NavLink className="navbar-username" href="#">username</NavLink>
          </>
        )}
        {isRankings && (
          <>
            <NavLink className="navbar-username" href="#">username</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}