import React from 'react';
import { BrowserRouter, NavLink, useLocation, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthState } from './login/authState';

export function Header({ authState, userName, searchTerm, onSearchChange, onSearchSubmit }) {
  const location = useLocation();
  const isMyAce = location.pathname === '/myace';
  const isRankings = location.pathname === '/rankings';
  const navigate = useNavigate();
  
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
              <NavLink className='nav-link' to='/myace'>
                MyAce
              </NavLink>
            </li>
          )}
          {authState === AuthState.Authenticated && (
            <li className='nav-item'>
              <NavLink className='nav-link' to='/rankings'>
                Rankings
              </NavLink>
            </li>
          )}
        </menu>
        {(isMyAce || isRankings) && (
          <NavLink className="navbar-username" href="#">
            {userName}
          </NavLink>
        )}
        {isMyAce && (
          <form 
            className="search-form" 
            onSubmit={(e) => {
              e.preventDefault();
              if (searchTerm.trim()) {
                onSearchSubmit();
                navigate('/myace');
              }
            }}
          >
            <div className="input-group">
              <span className="input-group-text">🔍</span>
              <input 
                className="form-control" 
                type="text" 
                placeholder="Search library"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)} 
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </form>
        )}
      </nav>
    </header>
  );
}