import http from 'http';

export default function requestBookUpdate(payload, requestOrigin) {
    console.log(`requestBookUpdate() -> ID: ${payload.Id}`);
    console.log(`requestBookUpdate() -> Price ${payload.Price}`);
    console.log(`requestBookUpdate() -> Origin: ${requestOrigin}`);
    
    let path = `/api/books`;
    let options = {
        host: 'localhost',
        port: 7000,
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

        let body = {};
        body.Id = payload.Id;
        body.Name = "";
        body.AuthorFirstName = "";
        body.AuthorLastName = "";
        body.Price = payload.Price;

        let json = JSON.stringify(body);
        console.log(`JSON: ${json}`);
        req.write(json);
    });
}