import http from 'http';

export default function requestBookDeletion(bookID, requestOrigin) {
    console.log(`requestBookDeletion() -> BookID: ${bookID}`);
    console.log(`requestBookDeletion() -> Origin: ${requestOrigin}`);

    let path = `/api/books?id=${bookID}`;
    let options = {
        host: 'localhost',
        port: 7000,
        path: path,
        method: 'DELETE',
        headers: {
            'X-Forwarded-For': `${requestOrigin}`,
            'Origin': 'localhost:4000',
            'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        let req = http.request(options, (response) => {
            let status = response.statusCode.toString();
            console.log(`STATUS ${status}`);
            if(response.statusCode === 200)
                resolve(status);
            else
                reject(status);

            response.on('end', () => {
                console.log('DELETE request ended');
            });
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
            reject('502');
        });

        req.end();
    });
}