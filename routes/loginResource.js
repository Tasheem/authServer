import Login from '../models/login.js';
import requestLogin from '../outboundRequests/requestLogin.js';
import jwt from '../jwtUtilities/jwt.js';

export async function login(req, res) {
    res.set({
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type, Access-Control-Expose-Headers',
        'Access-Control-Expose-Headers': 'Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Credentials': true
    });

    if(req.header('Content-Type') != 'application/json') {
        // Unsupported media type.
        res.status(415).send('Unsupported Media Type');
        return;
    }
    
    let login = new Login(req.body.username, req.body.password);
    
    if(login.username == undefined || login.password == undefined) {
        res.status(400).end('Data Unreadable.');
        return;
    }
    
    let origin = req.get('Origin');
    // console.log(`Origin: ${origin}`);
    let id = null;
    try {
        id = await requestLogin(login, origin);
        console.log(`LoginResource id variable: ${id}`);
    } catch(err) {
        console.log('Rejected promise returned in loginResource with requestLogin() function.')
        console.log('Rejection Value: ' + err + ' Status Code');

        let responseStatus = parseInt(err);

        if(responseStatus === 403)
            res.status(502).end();
        else
            res.status(responseStatus).end();
        return;
    }

    let token = jwt.createJWT(id);
    res.set('Authorization', 'Bearer ' + token).status(200).send();
}

export function preflightLogin(req, res) {
    /* let origin = req.get('Origin');
    console.log(`Origin: ${origin}`); */
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type, Access-Control-Expose-Headers',
        'Access-Control-Expose-Headers': 'Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Credentials': true
    }).end();
}