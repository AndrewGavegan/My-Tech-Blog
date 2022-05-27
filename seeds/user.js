const { User } = require('../models');

const data = [
    {
        username: 'John_Smith',
        email: 'J_Smith@hotmail.com',
        password: 'password123'
    },
    {
        username: 'Sally_Stevens',
        email: 'S_Stevens@hotmail.com',
        password: 'password123'
    },
    {
        username: 'Bianca_Brown',
        email: 'B_Brown@hotmail.com',
        password: 'password123'
    },
    {
        username: 'Stephen_Curry',
        email: 'S_Curryh@hotmail.com',
        password: 'password123'
    },
    {
        username: 'Klay_Thompson',
        email: 'K_Thompson@hotmail.com',
        password: 'password123'
    }
]

const seedUsers = () => User.bulkCreate(data);
module.exports = seedUsers;