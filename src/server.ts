import express from 'express';

const app = express();
const port = 3000;

// for parsing application/json
app.use(express.json());

const users = [
  {
    name: 'Leo',
    username: 'leoleo1234',
    passwort: '123abc',
  },
  {
    name: 'Dennis',
    username: 'karlkartoffel',
    passwort: '321cba',
  },
  {
    name: 'Lisa',
    username: 'lisalisboa',
    passwort: 'abc123',
  },
  {
    name: 'Lara',
    username: 'laramara',
    passwort: 'cba321',
  },
];

app.post('/api/users', (request, response) => {
  const newUser = request.body;
  const isNameKnown = users.includes(newUser.name);
  if (isNameKnown) {
    response.status(409).send('There is a Conflict.');
  } else {
    users.push(newUser.name);
    response.send(`${newUser.name} added`);
  }
});

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
