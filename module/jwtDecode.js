const jwt = require('jsonwebtoken');

module.exports = {
    decodeToken(req) {
        let token = req.headers.authorization;
        token = token.split(' ');
        token = token[1];
        const data = jwt.decode(token);
        if(data){
            return data
        }else{
            return 'Token Empty!'
        }
    }
}