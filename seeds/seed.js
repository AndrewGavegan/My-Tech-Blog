const seedComments = require('./comment');
const seedPosts = require('./post');
const seedUsers = require('./user');
const sequelize = require('../config/connection');

const seed = async () => {
  await sequelize.sync({ force: true });
  console.log('\n--- DB SYCNED ---\n');

  await seedUsers();
  console.log('\n--- USER SYCNED ---\n');

  await seedPosts();
  console.log('\n--- POST SYCNED ---\n');

  await seedComments();
  console.log('\n--- COMMENT SYCNED ---\n');

  process.exit(0);
};

seed();