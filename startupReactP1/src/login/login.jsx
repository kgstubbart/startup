import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-book-paper text-center">
            <div>
                <h5>Welcome to Library Ace! Login to start:</h5>
                <form method="get" action="/myace">
                    <div className="input-group mb-3">
                    <span className="input-group-text">👤</span>
                    <input className="form-control" type="text" placeholder="username" />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text">🔒</span>
                    <input className="form-control" type="password" placeholder="password" />
                    </div>
                    <p></p>
                    <button type="submit" className="btn btn-secondary me-2">Sign Up</button>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </main>
  );
}