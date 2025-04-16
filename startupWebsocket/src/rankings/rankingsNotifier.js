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
}

const RankingsNotifier = new RankingEventNotifier();
export { RankingsNotifier, RankingEvent };