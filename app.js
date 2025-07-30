let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
require('dotenv').load();

let routesFondoAhorro = require('./app_ahorro_api/routes/index.js');
let routesSeguridad = require('./app_seguridad_api/routes/index.js');

let app = express();

app.use(cors({}));
app.use(logger('dev'));

app.use(bodyParser.json({
    parameterLimit: 1000000,
    limit: '100mb',
    extended: true
}));

app.use(bodyParser.urlencoded({
    parameterLimit: 1000000,
    limit: '100mb',
    extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//rutas
app.use('/ahorro', routesFondoAhorro);
app.use('/seguridad', routesSeguridad);

app.use(function(req, res, next) {
    var err = new Error('No encontrada');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        if(err.name==="UnauthorizedError"){
          res.status(401);
          res.json({"message": err.name+":"+err.message });
        }
        else{
          console.log(err);
          res.status(err.status || 500);
          res.json('error', {
              message: err.message,
              error: err
          });
        }
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.json({"mensaje":"not found"});
});

console.log("servidor-------------------------------------------------");

module.exports = app;