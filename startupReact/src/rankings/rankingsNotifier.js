const users = [];

export const RankingEvent = {
  NewAce: 'newAce',
};

function broadcastEvent(username, eventType, book) {
  for (const callback of users) {
    callback({ username, eventType, book });
  }
}

export function addRankingUser(callback) {
  users.push(callback);
}

setInterval(() => {
  const users = ['Kaladin', 'Shallan', 'Elend', 'Vin', 'Sazed'];
  const books = ['Mistborn', 'Stormlight Archive', 'Elantris', 'Sunlit Man'];

  const user = users[Math.floor(Math.random() * users.length)];
  const book = books[Math.floor(Math.random() * books.length)];

  broadcastEvent(user, RankingEvent.NewAce, book);
}, 5000);