import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { MyAce } from './myace/myace';
import { Rankings } from './rankings/rankings';
import { Header } from './header';
import { AuthState } from './login/authState';


export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = React.useState('');
  
  return(
  <BrowserRouter>
    <div className="body bg-dark text-light">
    <Header 
      authState={authState}
      userName={userName}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onSearchSubmit={() => {
        setSubmittedSearchTerm(searchTerm);
      }}
    />

    <Routes>
      <Route path="/" element={<Login 
        userName={userName}
        authState={authState}
        onAuthChange={(userName, authState) => {
          setAuthState(authState);
          setUserName(userName);
        }}
      />} exact />
      <Route path="/myace" element={<MyAce searchTerm={searchTerm} userName={userName} />} />
      <Route path="/rankings" element={<Rankings />} />
      <Route path='*' element={<NotFound />} />
    </Routes>

    <footer className="bg-dark text-white-50">
      <div className="container-fluid">
          <span className="text-reset">Kason Stubbart</span>
          <a className="text-reset" href="https://github.com/kgstubbart/startup">Library Ace GitHub</a>
      </div>
    </footer>
    </div>
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}