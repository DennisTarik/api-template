import express from 'express';

const app = express();
const port = 3000;

const users = ['Leo', 'Riitta', 'Julian', 'Dennis'];

app.get('/api/users/:name', (request, response) => {
  const isNameKnown = users.includes(request.params.name);
  if (isNameKnown) {
    response.send(request.params.name);
  } else {
    response.status(404).send('Site not found.');
  }
});

app.get('/api/users', (_request, response) => {
  const users = ['Leo', 'Riitta', 'Julian', 'Dennis'];
  response.send(users);
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
