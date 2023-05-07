var redis = require("redis");
const configure = require('./configure')

const config = configure()
var db = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  username: config.redis.username,
  password: config.redis.password,
  retry_strategy: () => {
    return new Error("Retry time exhausted" + ":" + config.redis.host + "-" + config.redis.port)
  }
})

process.on('SIGINT', function() {
  db.quit();
});

module.exports = db
