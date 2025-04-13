const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const fetch = require('node-fetch');

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

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.username, req.body.password);
  
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
    }
  });