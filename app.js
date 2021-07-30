import express from 'express';
import { getRoot, postRoot } from './routes/rootResource.js';
import { login, preflightLogin } from './routes/loginResource.js';
import { getUsers, createUser, updateUser, deleteUser, preflightUser } from './routes/userResource.js';
import authenticate from './middleware/authenticate.js';
import { getBooks, postBook, updateBook, deleteBook, preflightBooks } from './routes/bookResource.js';

const app = express();
const port = 4000;
app.use(express.json(), authenticate);

app.get('/api', getRoot);
app.post('/api', postRoot);

app.post('/api/login', login);
app.options('/api/login', preflightLogin);

app.get('/api/users', getUsers);
app.post('/api/users', createUser);
app.put('/api/users', updateUser);
app.delete('/api/users', deleteUser);
app.options('/api/users', preflightUser);

app.get('/api/books', getBooks);
app.post('/api/books', postBook);
app.put('/api/books', updateBook);
app.delete('/api/books', deleteBook);
app.options('/api/books', preflightBooks);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}\n`);
});