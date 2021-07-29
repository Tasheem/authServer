import http from 'http';

export default function requestBookCreation(payload, requestOrigin) {
    console.log(`requestBookCreation() -> Name: ${payload.name}`);
    console.log(`requestBookCreation() -> Price ${payload.price}`);
    console.log(`requestBookCreation() -> Origin: ${requestOrigin}`);
    
    let path = `/api/books`;
    let options = {
        host: 'localhost',
        port: 7000,
        path: path,
        method: 'POST',
        headers: {
            'X-Forwarded-For': `${requestOrigin}`,
            'Origin': 'localhost:4000',
            'Content-Type': 'application/json'
        }
    };

    // resolve is the resource location while status code is sent
    // back if resource was not created.
    return new Promise((resolve, reject) => {
        let req = http.request(options, (response) => {
            let status = response.statusCode.toString();
            if(response.statusCode === 201) {
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

        let body = {};
        body.id = payload.id;
        body.name = payload.name;
        body.authorFirstName = payload.authorFirstName;
        body.authorLastName = payload.authorLastName;
        body.price = payload.price;

        let json = JSON.stringify(body);
        console.log(`JSON: ${json}`);
        req.write(json);
    });
}