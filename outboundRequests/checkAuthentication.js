import http from 'http';

export default function isAuthenticated(id, origin) {
    return new Promise((resolve, reject) => {
        let options = {
            host: 'localhost',
            port: 8000,
            path: `/api/user?Id=${id}`,
            method: 'GET',
            headers: {
                'X-Forwarded-For': `${origin}`,
                'Origin': 'localhost:4000'
            }
        };

        let req = http.request(options, (userServerResponse) => {
            if(userServerResponse.statusCode === 200)
                resolve(true)
            else if(userServerResponse.statusCode === 401)
                reject(false);
            
            userServerResponse.setEncoding('utf8');
    
            userServerResponse.on('end', () => {
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