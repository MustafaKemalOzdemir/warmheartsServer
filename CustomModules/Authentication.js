const keys = require('../private/keys');

let TokenCheck = (token) => {
    try {
        return { 'Success': true, 'token': jwt.verify(token, keys.jwtKey) };
    } catch (error) {
        return { 'Success': false, 'error': error }
    }
}

let TokenCreate = (id, expiryDate) => {
    return jwt.sign(
        { userId: id },
        keys.jwtKey,
        { expiresIn: expiryDate }
    );
}
module.exports = {
    TokenCheck,
    TokenCreate
}