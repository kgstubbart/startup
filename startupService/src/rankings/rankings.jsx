import React from 'react';
import './rankings.css';
import { addRankingUser, RankingEvent } from './rankingsNotifier';

export function Rankings() {
	const [topAces, setTopAces] = React.useState([]);
  	const [recentAces, setRecentAces] = React.useState([]);

	React.useEffect(() => {
	const tallies = JSON.parse(localStorage.getItem('bookTallies') || '{}');
	const bookMeta = JSON.parse(localStorage.getItem('bookMeta') || '{}');
	
	const sorted = Object.entries(tallies)
      .map(([id, count]) => {
        const meta = bookMeta[id] || {};
        return {
          id,
          count,
          title: meta.title || id,
          author: meta.author || `${id} Author`,
        };
      })
      .sort((a, b) => b.count - a.count);
	
	  setTopAces(sorted.slice(0, 3));
	}, []);

	React.useEffect(() => {
		const handler = ({ user, eventType, book }) => {
			if (eventType === RankingEvent.NewAce) {
				setRecentAces((prev) => {
				const updated = [{ user, title: book }, ...prev];
				return updated.slice(0, 3);
				});
			}
		};

		addRankingUser(handler);
	}, []);

	const bookMeta = JSON.parse(localStorage.getItem('bookMeta') || '{}');

	return (
		<main className="container-fluid bg-book-paper text-center">
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
			{topAces.map((book, index) => (
				<tr key={book.id}>
				<td>#{index + 1}</td>
				<td>{book.count}</td>
				<td>{book.title}</td>
				<td>{book.author}</td>
				</tr>
			))}
			</tbody>
		</table>

		<table className="table table-warning table-striped recent-aces-table">
			<caption className="fs-4 fw-bold">Recent Aces</caption>
			<thead className="table-dark">
			<tr>
				<th>User</th>
				<th>Title</th>
			</tr>
			</thead>
			<tbody>
			{recentAces.map((entry, idx) => (
				<tr key={idx}>
				<td>{entry.user}</td>
				<td>{bookMeta[entry.title]?.title || entry.title}</td>
				</tr>
			))}
			</tbody>
		</table>
		</main>
	);
}