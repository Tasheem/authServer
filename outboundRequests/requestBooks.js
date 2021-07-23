import http from 'http';

export default {
    getBooks(origin) {
        return new Promise((resolve, reject) => {
            let options = {
                host: 'localhost',
                port: 7000,
                path: '/api/books',
                method: 'GET',
                headers: {
                    'X-Forwarded-For': `${origin}`,
                    'Origin': 'localhost:4000'
                }
            };
    
            let req = http.request(options, (response) => {
                if(response.statusCode === 403)
                    reject(response.statusMessage);

                response.setEncoding('utf-8');

                response.on('data', (data) => {
                    console.log(`Book response body: ${data}`);
                    try {
                        let body = JSON.parse(data);
                        resolve(body);
                    } catch(err) {
                        reject('error with json parsing -> ' + err);
                    }
                });

                response.on('end', () => {
                    console.log('No more data in response.');
                });
            });

            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
                reject(502);
            });

            req.end();
        });
    }
}