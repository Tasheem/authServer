import http from 'http';

export default function requestUserCreation(payload, requestOrigin) {
    console.log(`requestUserCreation() -> firstname: ${payload.firstName}`);
    console.log(`requestUserCreation() -> lastname ${payload.lastName}`);
    console.log(`requestUserCreation() -> Origin: ${requestOrigin}`);
    
    let path = `/api/users`;
    let options = {
        host: 'localhost',
        port: 8000,
        path: path,
        method: 'POST',
        headers: {
            'X-Forwarded-For': `${requestOrigin}`,
            'Origin': 'localhost:4000',
            'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        let req = http.request(options, (response) => {
            let status = response.statusCode.toString();
            if(response.statusCode === 200) {
                const resourceLocation = response.headers['location'];
                console.log(resourceLocation);
                resolve(resourceLocation);
            }
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