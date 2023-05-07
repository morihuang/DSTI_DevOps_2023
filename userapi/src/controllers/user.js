const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("payload missing user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
    db.hgetall(user.username,function(err,res) {//added this to retrieve data of a particula user from database
      if(err) return callback(err,null)
      if(!res) {//if no user in database, 
        db.hmset(user.username, userObj, (err, res) => {//save the user in the database
      if (err) return callback(err, null)
      callback(null, res) // Return callback
      })
    }
      else{// if user is found in database
         callback(new Error("user already exists"), null)
      }
  })
  },
  //get: (username, callback) => {
   // TODO create this method
  get: (username, callback) => {
    if(!username)
      return callback(new Error("Username must be provided"), null)
    db.hgetall(username, function(err, res) {
      if (err) return callback(err, null)
      if (res)
        callback(null, res)
      else
        callback(new Error("User doesn't exists"), null)
    })
  
   }
}
