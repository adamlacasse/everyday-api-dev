const logger = require('koa-logger')
const serve = require('koa-static');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-parser');
const _ = require('lodash');
const router = require('./routes'); 

const cors = require('@koa/cors'); //awl

var app = new Koa();
app.use(logger());
app.use(cors()); //awl
const PORT = 8081;

const db = require('./models/index');
// db.sequelize.sync({force:true})
db.sequelize.sync({})
    .then(() => console.log('models synced!'))
    .catch(err => console.log(err));
    
app.context.db = db;
app.use(serve(__dirname + '/public'));
app.use(bodyParser()) // make sure you use bodyParser before the router
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);
console.log(`Server is listening on PORT ${PORT}`);