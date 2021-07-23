import requestBooks from '../outboundRequests/requestBooks.js';

export async function getBooks(req, res) {
    res.set({
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type'
    })

    let origin = req.get('Origin');

    try {
        let json = await requestBooks.getBooks(origin);
        res.status(200).set('Content-Type', 'application/json').send(json);
    } catch(err) {
        console.error('ERROR with getBooks() call in bookResource.js: ');
        console.error(error);
        res.status(502).end();
    }
}

export function preflightBooks(req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type'
    }).end();
}