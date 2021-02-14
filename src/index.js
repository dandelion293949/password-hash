const Password = require('./authentication/password');

function exec() {
  console.log('start');
  const users = new Password();

  users.create('testuser', 'password');
  users.output();
  users.create('dandelion', '1qazxsw2');
  users.output();
  users.compare('testuser', 'password');
  users.compare('testuser', '1qazxsw2');
  users.save();
  users.update('testuser', '1qazxsw2');
  users.create('dandelion', 'password');
  users.output();

  console.log('end');
}

exec();
