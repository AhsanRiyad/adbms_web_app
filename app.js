// declaration
var express = require('express');
var bodyParser = require('body-parser');
var auth = require.main.require('./controller/auth');
var app = express();
var port = 3000;

console.log('hellow');

// config
app.set('view engine' , 'ejs');


// middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use('/auth' , auth);



app.use('/lib/img', express.static(__dirname + '/lib/img/'));
app.use('/lib/js', express.static( __dirname + '/lib/js/'));
app.use('/lib/css', express.static( __dirname + '/lib/css/'));


// routes
app.get('/' , (req,res)=>{


	res.render('login');


}
);

app.post('/' , (req,res)=>{


	res.render('login');


}
);



app.listen(port, ()=>console.log('server started at port '+port));
