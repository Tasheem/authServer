import jwt from 'jsonwebtoken';

const KEY = 'secretKey';

export default {
    createJWT(userID) {
        console.log('Create JWT Reached.');

        let token = jwt.sign({
            id: userID
        }, KEY, {expiresIn: 60 * 60})

        return token;
    },

    verifyJWT(token) {
        return new Promise((resolve, reject) => {
            console.log('Verify JWT Reached.');
            
            let decodedToken = null;
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
    },

    async extractUserID(token) {
        let id = null;
        let decodedToken = await this.verifyJWT(token);
        id = decodedToken.id.toString();
        return id;
    }
}
