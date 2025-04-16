const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

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
            await DB.updateUser(user);
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
      DB.updateUser(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
async function verifyAuth(req, res, next) {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        req.username = user.username;
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
}

// Submit an ace
apiRouter.post('/ace', verifyAuth, async (req, res) => {
    const { bookId, title, author } = req.body;
    if (!bookId || !title || !author) {
      res.status(400).send({ msg: 'Missing fields' });
      return;
    }
  
    await DB.submitAce(req.username, bookId, title, author);
    res.send({ success: true });
});

// Get aces
apiRouter.get('/aces', verifyAuth, async (_req, res) => {
    const bookaces = await DB.getTopAces();
    res.send(bookaces);
});

// Get recent aces
apiRouter.get('/recent', verifyAuth, async (_req, res) => {
    const recentAces = await DB.getRecentAces();
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
    await DB.addUser(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;
    return field === 'token' ? DB.getUserByToken(value) : DB.getUser(value);
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
  
const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

peerProxy(httpService);