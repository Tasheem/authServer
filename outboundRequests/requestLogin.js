import http from 'http';

// This function returns the user's ID if the user exists in the system
// If the user does not exist, the status code as a string
export default function requestLogin(login, origin) {
    console.log(login);
    console.log(origin);
    // Replace whitespace with '+' so that query string values can be interpreted as one string.
    if(login.password.includes(' ')) {
        let result = login.password.replace(' ', '+');
        login.password = result;
        // console.log(`Password Without Spaces: ${login.password}`);
    } else if(login.username.includes(' ')) {
        let result = login.username.replace(' ', '+');
        login.username = result;
        console.log(`Username Without Spaces: ${login.username}`);
    }

    let path = `/api/users?Username=${login.username}&Password=${login.password}`;
    let options = {
        host: 'localhost',
        port: 8000,
        path: path,
        method: 'GET',
        headers: {
            'X-Forwarded-For': `${origin}`,
            'Origin': 'localhost:4000'
        }
    };

    return new Promise((resolve, reject) => {

        let req = http.request(options, (response) => {
            if(response.statusCode !== 200)
                reject(response.statusCode.toString());
            
            response.setEncoding('utf8');
    
            response.on('data', (chunk) => {
                // console.log(`BODY: ${chunk}`);
                try {
                    let body = JSON.parse(chunk);
                    resolve(body.id);
                } catch(err) {
                    console.log(err);
                    reject('500');
                }
            });
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
            reject('502');
        });
    
        req.end();
    });
}