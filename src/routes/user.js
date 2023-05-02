const express = require('express');  // import express
const userController = require('../controllers/user'); // Import user controller

const userRouter = express.Router(); // Create user router

// Creating POST route and set the user Controller 
userRouter.post('/', (req, resp) => {
  userController.create(req.body, (err, res) => {
    let respObj
    if(err) {
      // If error, send error response
      respObj = {
        status: "error",
        msg: err.message
      };
      return resp.status(400).json(respObj);
    }

    // If success, send success response
    respObj = {
      status: "success",
      msg: res
    };
    resp.status(201).json(respObj);
  });
})

// Create GET route and set the user controller
userRouter.get('/:username', (req, resp, next) => { 
  const username = req.params.username; // Get username from URL parameter
  userController.get(username, (err, res) => {
    let respObj;
    if(err) {
      //  If error, send error response
      respObj = {
        status: "error",
        msg: err.message
      };
      return resp.status(400).json(respObj);
    }
    // If success, send success response
    respObj = {
      status: 'success',
      msg: res
    };
    resp.status(200).json(respObj);
  })
});
  
module.exports = userRouter  // export user router to use in server.js