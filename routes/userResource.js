import requestUsers from '../outboundRequests/requestUsers.js';
import requestUserUpdate from '../outboundRequests/requestUserUpdate.js';
import requestUserCreation from '../outboundRequests/requestUserCreation.js';
import jwt from '../jwtUtilities/jwt.js';
import requestUserDeletion from '../outboundRequests/requestUserDeletion.js';

export async function getUsers(req, res) {
    res.set({
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization'
    });

    let origin = req.get('Origin');

    try {
        let json = await requestUsers(origin);
        res.status(200).set('Content-Type', 'application/json').send(json);
    } catch(error) {
        console.error('ERROR with requestUsers() call in UserResource: ');
        console.error(error);
        res.status(502).end();
    }
}

export async function createUser(req, res) {
    res.set({
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type'
    });

    let origin = req.get('Origin');

    try {
        let json = await requestUserCreation(req.body, origin);
        res.status(200).set('Content-Type', 'application/json').send(json);
    } catch(error) {
        console.error('ERROR with requestUserCreation() call in UserResource: ' + error);
        res.status(502).end();
    }
}

export async function updateUser(req, res) {
    res.set({
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type'
    });

    let origin = req.get('Origin');

    const authHeader = req.get('Authorization');
    const token = authHeader.replace('Bearer ', '');
    let decodedToken = await jwt.verifyJWT(token);
    let userID = decodedToken.id;
    console.log(`userID: ${userID}`);

    try {
        let status = await requestUserUpdate(userID, req.body, origin);
        res.status(status).send();
    } catch(error) {
        console.error('ERROR with requestUsers() call in UserResource -> ' + error);
        res.status(502).end();
    }
}

export async function deleteUser(req, res) {
    res.set({
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization'
    });

    let origin = req.get('Origin');

    const authHeader = req.get('Authorization');
    const token = authHeader.replace('Bearer ', '');
    const decodedToken = await jwt.verifyJWT(token);
    const userID = decodedToken.id;
    console.log(`userID: ${userID}`);

    try {
        let status = await requestUserDeletion(userID, origin);
        res.status(status).send();
    } catch(error) {
        console.error('ERROR with requestUserDeletion() call in UserResource -> ' + error);
        res.status(502).end();
    }
}

export function preflightUser(req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE'
    }).end();
}