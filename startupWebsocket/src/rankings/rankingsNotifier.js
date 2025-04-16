const users = [];

const RankingEvent = {
    NewAce: 'newAce',
};

class EventMessage {
    constructor(user, type, book) {
        this.from = user;
        this.type = type;
        this.value = { title: book };
    }
}

class RankingEventNotifier {
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                if (event.type === RankingEvent.NewAce) {
                    this.handlers.forEach((handler) => {
                        handler({user: event.from, eventType: event.type, book: event.value.title});
                    });
                }
            } catch {}
        };
    }

    broadcastEvent(user, title) {
        const event = new EventMessage(user, RankingEvent.NewAce, title);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    receiveEvent(event) {
        this.events.push(event);

        this.events.forEach((e) => {
            this.handlers.forEach((handler) => {
                handler(e);
            });
        });
    }
}

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