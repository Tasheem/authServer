import isAuthenticated from "../outboundRequests/checkAuthentication.js";
import jwt from '../jwtUtilities/jwt.js';

export default async function authenticate(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
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

        res.status(401).end('Authorization Header required.');
        return;
    }

    let token = authHeader.replace('Bearer ', '');
    console.log(`token: ${token}`);
    let decodedToken = null;
    try {
        decodedToken = await jwt.verifyJWT(token);
        console.log(`id claim: ${Object.keys(decodedToken)}`);
    } catch(err) {
        console.log('Error with verifyJWT in authenticate.js')
        console.log(err);
    }


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