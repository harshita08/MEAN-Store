var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var session = require('express-session')
var app = express()
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client')))

app.use(express.static(path.join(__dirname, '/bower_components')));

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app)

process.env.PORT = process.env.PORT || 8000
app.listen(process.env.PORT, function(){
	console.log(process.env.PORT)
})
