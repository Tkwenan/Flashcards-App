const express = require('express');
const router = express.Router();


//root route
//first parameter -> the location parameter
//second parameter -> an anonymous callback function that
//takes two parameters: a request object and a response object
//by convention always type 'req' and 'res'
//this callback will run when the clients request this route
router.get('/', (req, res) => {
    const name = req.cookies.username;
    //if the value of 'name' exists,
   //render the index template (index.pug)
    if (name) {
      res.render('index', { name });
    } 
    //else, redirect users to the hello page/route if the cookies' username
    //key isn't set
    else {
      res.redirect('/hello');
    }
});

//the incoming request contains cookies
//read the username from the cookies
router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
      res.redirect('/');
    } 
    //render hello.pug
    else {
      res.render('hello');
    }
  });


router.post('/hello', (req, res) => {
     //this will send a cookie to the browser after we submit the form
     res.cookie('username', req.body.username);
     res.redirect('/');
});
 

router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

//export the router so you can reference it in the app.js file
module.exports = router;
