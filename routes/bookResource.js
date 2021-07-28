import requestBookDeletion from '../outboundRequests/requestBookDeletion.js';
import requestBooks from '../outboundRequests/requestBooks.js';
import requestBookUpdate from '../outboundRequests/requestBookUpdate.js';

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

export async function updateBook(req, res) {
    res.set({
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type'
    })
    let origin = req.get('Origin');
    let payload = req.body;
    console.log(`Origin: ${origin}`);
    console.log(`Payload: ${payload.Id}`);

    try {
        // TODO: send PUT request to Go server.
        // Get params to pass into async function below.
        let response = await requestBookUpdate(payload, origin);
        res.status(parseInt(response)).send();
    } catch(error) {
        console.error('ERROR with requestBookUpdate() call in bookResource');
        console.log('Error: '+ error);
        res.status(502).end();
    }
}

export async function deleteBook(req, res) {
    res.set({
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type'
    })

    let id = req.query.id;
    let origin = req.get('Origin');

    try {
        // TODO: send PUT request to Go server.
        // Get params to pass into async function below.
        let response = await requestBookDeletion(id, origin);
        res.status(parseInt(response)).send();
    } catch(error) {
        console.error('ERROR with requestBookDeletion() call in bookResource');
        console.log('Error: '+ error);
        res.status(502).end();
    }
}

export function preflightBooks(req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE'
    }).end();
}