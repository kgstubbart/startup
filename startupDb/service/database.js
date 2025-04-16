const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('users');
const scoreCollection = db.collection('aces');

const bcrypt = require('bcryptjs');
const uuid = require('uuid');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(username) {
  return userCollection.findOne({ username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token });
}

async function addUser(username, password) {
  const user = {
    username,
    password: await bcrypt.hash(password, 10),
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  return user;
}

async function updateToken(username, newToken) {
  await userCollection.updateOne({ username }, { $set: { token: newToken } });
}

// async function addScore(score) {
//   return scoreCollection.insertOne(score);
// }

// function getHighScores() {
//   const query = { score: { $gt: 0, $lt: 900 } };
//   const options = {
//     sort: { score: -1 },
//     limit: 10,
//   };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }

// module.exports = {
//   getUser,
//   getUserByToken,
//   addUser,
//   updateUser,
//   addScore,
//   getHighScores,
// };
