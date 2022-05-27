const { Comment } = require('../models');

const data = [
    {
        user_id: 1,
        post_id: 5,
        body: "Test comment 1!"
    },
    {
        user_id: 2,
        post_id: 1,
        body: "Test comment 2!"
    },
    {
        user_id: 4,
        post_id: 4,
        body: "Test comment 3!"
    },
    {
        user_id: 5,
        post_id: 2,
        body: "Test comment 4!"
    },
    {
        user_id: 3,
        post_id: 3,
        body: "Test comment 5!"
    }
]

const seedComments = () => Comment.bulkCreate(data);
module.exports = seedComments;