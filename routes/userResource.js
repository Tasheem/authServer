import requestUsers from '../outboundRequests/requestUsers.js';

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

export function preflightUser(req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type'
    }).end();
}