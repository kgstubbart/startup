const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('libraryace');
const userCollection = db.collection('users');
const aceCollection = db.collection('aces');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB');
  } catch (ex) {
    console.log(`Unable to connect to database: ${ex.message}`);
    process.exit(1);
  }
})();

// === USER FUNCTIONS ===

function getUser(username) {
  return userCollection.findOne({ username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

// === ACE LOGIC ===

async function submitAce(username, bookId, title, author) {
  const user = await getUser(username);

  if (user?.ace && user.ace !== bookId) {
    const result = await aceCollection.findOneAndUpdate(
      { bookId: user.ace },
      { $inc: { count: -1 } },
      { returnDocument: 'after' }
    );
  
    if (result.value && result.value.count <= 0) {
      await aceCollection.deleteOne({ bookId: user.ace });
    }
  }

  await aceCollection.updateOne(
    { bookId },
    { $set: { title, author }, $inc: { count: 1 } },
    { upsert: true }
  );

  await userCollection.updateOne(
    { username },
    { $set: { ace: bookId, updatedAt: new Date() } }
  );
}

function getTopAces() {
  return aceCollection.find({ count: { $gt: 0 } }).sort({ count: -1 }).limit(10).toArray();
}

async function getRecentAces() {
  const users = await userCollection
    .find({ ace: { $exists: true } })
    .sort({ updatedAt: -1 })
    .limit(5)
    .project({ username: 1, ace: 1 })
    .toArray();

  const recent = [];

  for (const u of users) {
    const book = await aceCollection.findOne({ bookId: u.ace });
    if (book) {
      recent.push({ user: u.username, title: book.title });
    }
  }

  return recent;
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  submitAce,
  getTopAces,
  getRecentAces,
};