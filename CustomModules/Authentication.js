const keys = require('../private/keys');

let TokenCheck = (token) => {
    try {
        return  { 'Success': true, 'token' : jwt.verify(token, keys.jwtKey)};
    } catch (error) {
        return{ 'Success': false, 'error' : error}
    }
}

module.exports = {
    TokenCheck
}