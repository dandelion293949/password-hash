const fs = require('fs');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const usersFile = './data/users.txt';
module.exports = class Password {
  constructor() {
    console.log('constructor');
    const data = fs.readFileSync(usersFile, 'utf-8');

    const lines = data.split('\n');
    const users = [];
    for (let key in lines) {
      if (lines[key] == '') continue;
      const user = JSON.parse(lines[key]);
      if (user.user in users) continue;
      users[user.user] = user;
    }
    this.users = users;
  }

  create (username, password) {
    if (username in this.users) {
      return;
    }

    const hash = bcrypt.hashSync(password, saltRounds);
    const user = {
      "user": username,
      "hash": hash
    };

    this.users[user.user] = user;
  }

  update (username, password) {
    if (username in this.users) {
      const hash = bcrypt.hashSync(password, saltRounds);
      const user = this.users[username];
      user.hash = hash;
      this.users[username] = user;
    }
  }

  async save () {
    for (let key in this.users) {
      await fs.appendFile(usersFile, JSON.stringify(this.users[key]) + '\n', (err) => {
        if (err) throw err;
      });
    }
  };
  
  compare (username, password) {
    if (username in this.users) {
      const user = this.users[username];
      const result = bcrypt.compareSync(password, user.hash);

      return result;
    }
  }

  output () {
    console.log('output start ---');
    for (let key in this.users) {
      console.log(`${key}: ${this.users[key].hash}`);
    }
    console.log('output end ---');
  }
}

