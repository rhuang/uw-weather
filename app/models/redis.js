/**
 * A singleton class for the Redis instance to be used throughout the app. The Redis client is
 * created depending on the environment and is provided by getClient. This class also provides a
 * method to determine if Redis is in production or not.
 */
var redis = require('redis');

/**
 * The singleton constructor.
 */
var Redis = (function() {
    /**
     * Returns the Redis client. Will authenticate if REDISTOGO_URL (heroku) environment variable is
     * available.
     */
    function getClient() {
        var client;
        if (process.env.REDISTOGO_URL) {
            var rtg = require("url").parse(process.env.REDISTOGO_URL);
            client = require("redis").createClient(rtg.port, rtg.hostname);
            client.auth(rtg.auth.split(":")[1]); 
        } else {
            client = require("redis").createClient();
        }
        return client;
    }

    /**
     * @return {string} 'production' and 'development for production and development environment.
     */
    function getEnv() {
        if (process.env.REDISTOGO_URL) return 'production';
        else return 'development';
    }

    return {
        getClient: getClient,
        getEnv: getEnv
    };
})();

module.exports = Redis;

