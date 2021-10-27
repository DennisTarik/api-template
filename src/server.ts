import express from 'express';

const app = express();
const port = 3000;

// for parsing application/json
app.use(express.json());

const users = ['Leo', 'Riitta', 'Julian', 'Dennis'];

app.post('/api/users', (request, response) => {
  const newUser = request.body;
  const isNameKnown = users.includes(newUser.name);
  if (isNameKnown) {
    response.status(409).send('There is a Conflict.');
  } else {
    users.push(newUser.name);
    response.send(`${newUser.name} added`);
  }
  // You can use Splice to add a new name to an array
  /* users.splice(users.length, 0, newUser.name); */
  // You can use push to add a new name to an array
});

app.delete('/api/users/:name', (request, response) => {
  const isNameKnown = users.includes(request.params.name);
  if (isNameKnown) {
    const singleUser = users.indexOf(request.params.name);
    users.splice(singleUser, 1);
    response.send(users);
  } else {
    response.status(404).send('Site not found.');
  }
});

app.get('/api/users/:name', (request, response) => {
  const isNameKnown = users.includes(request.params.name);
  if (isNameKnown) {
    response.send(request.params.name);
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
