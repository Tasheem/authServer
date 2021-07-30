import requestUsers from '../outboundRequests/requestUsers.js';
import requestUserUpdate from '../outboundRequests/requestUserUpdate.js';
import requestUserCreation from '../outboundRequests/requestUserCreation.js';
import jwt from '../jwtUtilities/jwt.js';

export async function getUsers(req, res) {
    res.set({
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type'
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
    console.log('authHeader: ' + authHeader);
    const token = authHeader.replace('Bearer ', '');
    console.log('token: ' + token);
    let decodedToken = await jwt.verifyJWT(token);
    console.log(`decodeToken: ${decodedToken}`);
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

export function preflightUser(req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE'
    }).end();
}