import React from 'react';
import './rankings.css';
import { RankingsNotifier, RankingEvent } from './rankingsNotifier';

export function Rankings() {
  const [topAces, setTopAces] = React.useState([]);
  const [recentAces, setRecentAces] = React.useState([]);
  const [topError, setTopError] = React.useState(false);
  const [recentError, setRecentError] = React.useState(false);

  React.useEffect(() => {
    fetch('/api/aces', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized or server error');
        return res.json();
      })
      .then((data) => setTopAces(data))
      .catch((err) => {
        console.error('Failed to fetch top aces:', err);
        setTopError(true);
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/recent', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized or server error');
        return res.json();
      })
      .then((data) => setRecentAces(data))
      .catch((err) => {
        console.error('Failed to fetch recent aces:', err);
        setRecentError(true);
      });
  }, []);

  React.useEffect(() => {
    RankingsNotifier.addHandler(({ user, eventType, book }) => {
      if (eventType === RankingEvent.NewAce) {
        setRecentAces((prev) => {
          const updated = [{ user, title: book }, ...prev];
          return updated.slice(0, 5);
        });
      }
    });
  }, []);

  return (
    <main className="container-fluid bg-book-paper text-center py-4">
      {/* Top Aces Table */}
      <table className="table table-warning table-striped top-aces-table">
        <caption className="fs-4 fw-bold">Top Aces</caption>
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>Aces</th>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {topError ? (
            <tr>
              <td colSpan="4">⚠ Failed to load top aces</td>
            </tr>
          ) : Array.isArray(topAces) && topAces.length > 0 ? (
            topAces.map((book, index) => (
              <tr key={book.id}>
                <td>#{index + 1}</td>
                <td>{book.count}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No aces submitted yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Recent Aces Table */}
      <table className="table table-warning table-striped recent-aces-table mt-5">
        <caption className="fs-4 fw-bold">Recent Aces</caption>
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {recentError ? (
            <tr>
              <td colSpan="2">⚠ Failed to load recent aces</td>
            </tr>
          ) : Array.isArray(recentAces) && recentAces.length > 0 ? (
            recentAces.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.user}</td>
                <td>{entry.title}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No recent aces yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}