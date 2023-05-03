const redis = require("redis");
const configure = require('./configure')

// Load the configuration
const config = configure()
const cacheHostName = process.env.REDIS_HOST_NAME;
const cachePassword = process.env.AZURE_CACHE_FOR_REDIS_ACCESS_KEY;

// Check if the required environment variables are set
// if(!cacheHostName) throw new Error("AZURE_CACHE_FOR_REDIS_HOST_NAME is not set")
// if(!cachePassword) throw new Error("AZURE_CACHE_FOR_REDIS_ACCESS_KEY is not set")

// Create a new Redis client instance with SSL enabled
const db = redis.createClient({
  url: `rediss://${cacheHostName}:6379`,
  password: cachePassword,

  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with an individual error
      return new Error('The server refused the connection');
    }  
    
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands with an individual error
      return new Error('Retry time exhausted');
    }

    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
    
    return new Error('Retry time exhausted')
  }
})

// Handle the SIGINT signal (e.g., when you stop the server)
process.on('SIGINT', function() {
  db.quit();
});

module.exports = db
