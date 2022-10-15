const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/static', express.static('public'));


app.set('view engine', 'pug');

//import the index.js file which contains our routes
//Express automatically loads the index.js file if it exists in the 
//specified folder
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');
//create middleware
app.use(mainRoutes);
app.use('/cards', cardRoutes);

//root route
//first parameter -> the location parameter
//second parameter -> an anonymous callback function that
//takes two parameters: a request object and a response object
//by convention always type 'req' and 'res'
//this callback will run when the clients request this route
//app.get('/', (req, res) => {
 //   const name = req.cookies.username;
   
   //if the value of 'name' exists,
   //render the index template (index.pug)
//    if (name) {
//      res.render('index', { name });
//    } 
  //else, redirect users to the hello page/route if the cookies' username
  //key isn't set
 //   else {
 //     res.redirect('/hello');
 //   }
//});

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  app.use((err, req, res, next) => {
    res.locals.error = err;
    if (err.status >= 100 && err.status < 600)
      res.status(err.status);
    else
      res.status(500);
    res.render('error');
  });
  

  app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});