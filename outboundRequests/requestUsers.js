import http from 'http';

export default function requestUsers(origin) {
    return new Promise((resolve, reject) => {
        let options = {
            host: 'localhost',
            port: 8000,
            path: '/api/users',
            method: 'GET',
            headers: {
                'X-Forwarded-For': `${origin}`,
                'Origin': 'localhost:4000'
            }
        };

        let req = http.request(options, (userServerResponse) => {
            if(userServerResponse.statusCode === 403)
                reject(userServerResponse.statusMessage);
            
            userServerResponse.setEncoding('utf8');
    
            userServerResponse.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
                try {
                    let body = JSON.parse(chunk);
                    // console.log(`OBJ: ${body}`);
                    resolve(body);
                } catch(err) {
                    reject('error with json parsing -> ' + err);
                }
            });
    
            userServerResponse.on('end', () => {
                console.log('No more data in response.');
            });
        })

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
            reject(502);
        });
    
        req.end();
    });
}