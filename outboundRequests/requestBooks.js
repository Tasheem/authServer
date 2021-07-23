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
                if(response.statusCode === 401)
                    reject(response.statusMessage);
            });
        });
    }
}