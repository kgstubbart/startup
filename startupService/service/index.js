const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = [];
let aces = {};
let userAces = {};
let recentAces = [];

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

// === Auth Endpoints ===

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.username, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send({ username: user.username });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

// Submit an ace
apiRouter.post('/ace', verifyAuth, (req, res) => {
    const username = getUsernameFromToken(req.cookies[authCookieName]);
    const { bookId, title, author } = req.body;
    if (!bookId || !title || !author) {
        return res.status(400).send({ msg: 'Missing required fields' });
    }
    const previous = userAces[username];
    if (previous && aces[previous]) {
        aces[previous] = Math.max(aces[previous] - 1, 0);
    }
    if (!aces[bookId]) {
        aces[bookId] = { title, author, count: 1 };
    } else {
        aces[bookId].count += 1;
    }

    userAces[username] = bookId;
    recentAces.unshift({ user: username, title });
    recentAces = recentAces.slice(0, 3);

    res.send({ success: true });
});

// Get aces
apiRouter.get('/aces', verifyAuth, (_req, res) => {
    try {
      const ranked = Object.entries(aces)
        .map(([id, data]) => ({
          id,
          ...data,
        }))
        .sort((a, b) => b.count - a.count);
  
      res.send(ranked.slice(0, 10));
    } catch (err) {
      console.error('Error in /api/aces:', err);
      res.status(500).send({ msg: 'Internal Server Error in /api/aces' });
    }
  });

// Get recent aces
apiRouter.get('/recent', verifyAuth, (_req, res) => {
    res.send(recentAces);
});

// === Helpers ===

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);

    return user;
}

async function findUser(field, value) {
    return users.find((user) => user[field] === value);
}

function getUsernameFromToken(token) {
    const user = users.find((u) => u.token === token);
    return user ? user.username : null;
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

// === Error Handling ===

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ type: err.name, message: err.message });
});
  
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});