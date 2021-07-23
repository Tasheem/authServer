import express from 'express';
import { getRoot } from './routes/rootResource.js';
import { postRoot } from './routes/rootResource.js';
import { login } from './routes/loginResource.js';
import { preflightLogin } from './routes/loginResource.js';
import { getUsers } from './routes/userResource.js';
import { preflightUser } from './routes/userResource.js';
import authenticate from './middleware/authenticate.js';

const app = express();
const port = 4000;
app.use(express.json(), authenticate);

app.get('/api', getRoot);
app.post('/api', postRoot);

app.post('/api/login', login);
app.options('/api/login', preflightLogin);

app.get('/api/user', getUsers);
app.options('/api/user', preflightUser);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}\n`);
});