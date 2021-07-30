import http from 'http';

export default function requestUserUpdate(userID, payload, requestOrigin) {
    console.log(`requestUserUpdate() -> ID: ${userID}`);
    console.log(`requestUserUpdate() -> First Name: ${payload.firstName}`);
    console.log(`requestUserUpdate() -> Last Name: ${payload.lastName}`);
    console.log(`requestUserUpdate() -> Origin: ${requestOrigin}`);

    let path = `/api/users/${userID}`;
    console.log(`Request Path: ${path}`);
    let options = {
        host: 'localhost',
        port: 8000,
        path: path,
        method: 'PUT',
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
                console.log('PUT request ended');
            });
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
            reject('502');
        });

        let json = JSON.stringify(payload);
        console.log(`JSON: ${json}`);
        req.write(json);
    });
}