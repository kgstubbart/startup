const users = [];

export const RankingEvent = {
    NewAce: 'newAce',
};

function broadcastEvent(user, eventType, book) {
    for (const callback of users) {
        callback({ user, eventType, book });
  }
}

export function addRankingUser(callback) {
    users.push(callback);
}

setInterval(() => {
    const names = ['Kaladin', 'Shallan', 'Elend', 'Vin', 'Sazed', 'Kelsier', 'Dalinar', 'Adolin', 'Navani', 'Eshonai', 'Shalash', 'Lopen'];
    const books = ['Mistborn', 'Elantris', 'Sunlit Man', 'Warbreaker', 'Secret History', 'Yumi and the Nightmare Painter', 'The Emperor\'s Soul', 'White Sand', 'The Way of Kings', 'Words of Radiance', 'Oathbringer', 'Rhythm of War', 'Wind and Truth'];
    const user = names[Math.floor(Math.random() * names.length)];
    const book = books[Math.floor(Math.random() * books.length)];

    broadcastEvent(user, RankingEvent.NewAce, book);
}, 5000);