import isAuthenticated from "../outboundRequests/checkAuthentication.js";
import jwt from '../jwtUtilities/jwt.js';

export default async function authenticate(req, res, next) {
    let destination = req.originalUrl;
    console.log(`Destination: ${destination}`);

    // Skip authentication process if user is logging in
    // or the request is a preflight request.
    if(req.method === 'OPTIONS') {
        console.log('Preflight request is skipping auth process.');
        next();
        return;
    } else if(destination === '/api/login') {
        console.log('Login request skipping auth process.');
        next();
        return;
    }

    let authHeader = req.get('Authorization');

    if(authHeader === undefined || authHeader === null) {
        console.log('No Authorization Header');

        res.status(401).set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
        .end('Authorization Header required.');
    }

    let token = authHeader.replace('Bearer ', '');
    let decodedToken = null;
    try {
        decodedToken = await jwt.verifyJWT(token);
    } catch(err) {
        console.log('Error with verifyJWT in authenticate.js')
        console.log(err);
    }

    console.log(`id claim: ${decodedToken.id}`);

    let origin = req.get('Origin');
    let ok = null;
    try {
        ok = await isAuthenticated(decodedToken.id, origin);
    } catch(err) {
        console.error('Error with isAuthenticated() in authenticate.js: ');
        console.error(err);
    }

    if(!ok)
        res.status(401).end();
    else 
        next();
}