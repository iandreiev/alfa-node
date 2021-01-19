const config = require('../config/config.json');
const jwt = require('jsonwebtoken');

const users = [{ id: 1, username: 'test@gmail.com', password: 'abc123456', firstName: 'Ivan', lastName: 'Petrov' }];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function getAll() {
    return users.map(u => omitPassword(u));
}


function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

/*
Explaining:

POST /users/authenticate - generate JWT for user if username and password is correct
GET /users/ - using authentication with Bearer<token>

*/