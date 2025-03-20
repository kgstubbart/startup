import React from 'react';
import './rankings.css';

export function Rankings() {
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
				  <tr>
					<td>#1</td>
					<td>23</td>
					<td>Mistborn: The Final Empire</td>
					<td>Brandon Sanderson</td>
				  </tr>
				  <tr>
					<td>#2</td>
					<td>19</td>
					<td>Harry Potter</td>
					<td>JK Rowling</td>
				  </tr>
				  <tr>
					<td>#3</td>
					<td>18</td>
					<td>Eragon</td>
					<td>Christopher Paolini</td>
				  </tr>
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
				  <tr>
					<td>Elend</td>
					<td>Mistborn: The Final Empire</td>
				  </tr>
				  <tr>
					<td>Kaladin</td>
					<td>Stormlight Archive</td>
				  </tr>
				  <tr>
					<td>Nephi</td>
					<td>The Book of Mormon</td>
				  </tr>
				</tbody>
			  </table>
        </main>
  );
}