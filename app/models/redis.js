/**
 * A singleton class for the Redis instance to be used throughout the app. The Redis client is
 * created depending on the environment and is provided by getClient.
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

    return {
        getClient: getClient
    };
})();

module.exports = Redis;

