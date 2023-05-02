const db = require('../dbClient') //declare sth will be using, this's a db

module.exports = {
  create: (user, callback) => { 
    // Check parameters
    if(!user.username) {   // check username
      return callback(new Error("Wrong user parameters"));
    }
    
    // Create User schema
    const { firstname, lastname } = user;
    const userObj = { firstname, lastname };

    // check if user already exists
    db.hgetall(user.username, (err,res) => {
      if (err) return callback(err);
      if (res) return callback(new Error("User already exists."));
      
      // Save to DB
      db.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err);
        callback(null, res); // Return callback
      });
    });
      
  },

  get: (username, callback) => {
    if (!username) {
      return callback(new Error("Username must be provided"));
    }

    db.hgetall(username, (err, res) => {
      if (err) return callback(err)
      if (!res) return callback(new Error("User doesn't exist."));
      callback(null, res)
    });
  }
};
