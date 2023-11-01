const Redis = require('ioredis');
// const seeders = require('./seeders');

const options = {
    host: process.env.REDIS_ENDPOINT_URL,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    port: Number(process.env.REDIS_PORT),
}

const client = new Redis(options);


client.on('connect', function () {

    console.log('-------------------------------------')
    console.log('Redis Server Conneced On Port:', process.env.REDIS_PORT);
    console.log('-------------------------------------')
});

module.exports = { client };