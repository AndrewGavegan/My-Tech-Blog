const { Post } = require('../models');

const data = [
    {
        name: "Test Post 1!",
        body: "Test post body 1!!!!!",
        user_id: 2
    },
    {
        name: "Test Post 2!",
        body: "Test post body 2!!!!!",
        user_id: 4
    },
    {
        name: "Test Post 3!",
        body: "Test post body 3!!!!!",
        user_id: 3
    },
    {
        name: "Test Post 4!",
        body: "Test post body 4!!!!!",
        user_id: 5
    },
    {
        name: "Test Post 5!",
        body: "Test post body 5!!!!!",
        user_id: 1
    }
]

const seedPosts = () => Post.bulkCreate(data);
module.exports = seedPosts;