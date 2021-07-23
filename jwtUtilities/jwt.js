import jwt from 'jsonwebtoken';

const KEY = 'secretKey';

export default {
    createJWT(userID) {
        console.log('Create Reached.');

        let token = jwt.sign({
            id: userID
        }, KEY, {expiresIn: 60})

        return token;
    },

    verifyJWT(token) {
        return new Promise((resolve, reject) => {
            console.log('Verify Reached.');
            
            let decodedToken = null;
            // This is a hack to make Node.js wait for the verify function to return.
            jwt.verify(token, KEY, function(err, decoded) {
                if(err) {
                    console.error(err);
                    decodedToken = 'error';
                    return;
                }
    
                // console.log(decoded);
                decodedToken = decoded;
                // console.log(decodedToken);
            });
    
            if(decodedToken === 'error')
                reject(decodedToken);
            else 
                resolve(decodedToken);
        });
    }
}
