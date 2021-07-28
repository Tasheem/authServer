import express from 'express';
import { getRoot, postRoot } from './routes/rootResource.js';
import { login, preflightLogin } from './routes/loginResource.js';
import { getUsers, preflightUser } from './routes/userResource.js';
import authenticate from './middleware/authenticate.js';
import { getBooks, updateBook, preflightBooks } from './routes/bookResource.js';

const app = express();
const port = 4000;
app.use(express.json(), authenticate);

app.get('/api', getRoot);
app.post('/api', postRoot);

app.post('/api/login', login);
app.options('/api/login', preflightLogin);

app.get('/api/user', getUsers);
app.options('/api/user', preflightUser);

app.get('/api/books', getBooks);
app.put('/api/books', updateBook);
app.options('/api/books', preflightBooks);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}\n`);
});