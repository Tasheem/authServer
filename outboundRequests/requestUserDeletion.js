import http from 'http';

export default function requestUserDeletion(userID, requestOrigin) {
    console.log(`requestUserDeletion() -> ID: ${userID}`);
    console.log(`requestUserDeletion() -> Origin: ${requestOrigin}`);
    
    let path = `/api/users/${userID}`;
    console.log(`Request Path: ${path}`);
    let options = {
        host: 'localhost',
        port: 8000,
        path: path,
        method: 'DELETE',
        headers: {
            'X-Forwarded-For': `${requestOrigin}`,
            'Origin': 'localhost:4000',
        }
    };

    return new Promise((resolve, reject) => {
        let req = http.request(options, (response) => {
            let status = response.statusCode.toString();
            console.log(`STATUS: ${status}`);
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