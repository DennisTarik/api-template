import express from 'express';

const app = express();
const port = 3000;

// for parsing application/json
app.use(express.json());

// Middleware for Cookie Parsing

const users = [
  {
    name: 'Leo',
    username: 'leoleo1234',
    password: '123abc',
  },
  {
    name: 'Dennis',
    username: 'karlkartoffel',
    password: '321cba',
  },
  {
    name: 'Lisa',
    username: 'lisalisboa',
    password: 'abc123',
  },
  {
    name: 'Lara',
    username: 'laramara',
    password: 'cba321',
  },
];

// Login a new user
app.post('/api/login', (request, response) => {
  const user = users.find(
    (user) =>
      user.username === request.body.username &&
      user.password === request.body.password
  );
  if (user) {
    response.send(`${user.username} logged in`);
  } else {
    response.status(401).send('Username/Password incorrect');
  }
});

// Post a new user
app.post('/api/users', (request, response) => {
  const newUser = request.body;
  if (
    typeof newUser.name !== 'string' ||
    typeof newUser.username !== 'string' ||
    typeof newUser.password !== 'string'
  ) {
    response.status(400).send('Missing properties.');
    return;
  }

  if (users.some((user) => user.username === newUser.username)) {
    response.status(409).send('User already exists');
  } else {
    users.push(newUser);
    response.send(`${newUser.name} added`);
  }
});

// Delete a new user
app.delete('/api/users/:username', (request, response) => {
  const user = users.find((user) => user.username === request.params.username);
  if (user) {
    const filter = users.filter(
      (user) => user.username != request.params.username
    );
    JSON.stringify(user);
    response.send(filter);
  } else {
    response.status(404).send('Site not found.');
  }
});

// Get a new user
app.get('/api/users/:name', (request, response) => {
  const user = users.find((user) => user.username === request.params.name);
  if (user) {
    response.send(user);
  } else {
    response.status(404).send('Site not found.');
  }
});

app.get('/api/users', (_request, response) => {
  response.send(users);
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
