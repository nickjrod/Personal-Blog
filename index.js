const { config, engine } = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const dateformat = require('dateformat');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const storePost = require('./middleware/storePost');
const connectMongo = require('connect-mongo');
const auth = require('./middleware/auth');
const edge = require('edge.js');
const expressSession = require('express-session');

const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const getSearchController = require('./controllers/getSearch');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const loginController = require('./controllers/login');

const app = new express();

app.use(expressSession({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

mongoose.connect('mongodb://localhost/test',{useUnifiedTopology: true, useNewUrlParser: true}).then(() => 'You are now connected to Mongo!').catch(err => console.error('Something went wrong', err));

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
	secret: 'secret',
	store: new mongoStore({
		mongooseConnection: mongoose.connection}),
	resave: true,
	saveUninitialized: true
	})
);

app.use(express.static('public'));
app.use(engine);
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/posts/store', storePost);
app.set('views', __dirname + '/views');
app.use('*', (req, res, next) => {
	edge.global('auth', req.session.userId)
	next()
});

app.get('/', homePageController);
app.get('/post/:id', getPostController);
app.get('/posts/new', createPostController);
app.post('/posts/store', auth, storePostController);
app.get('/search', getSearchController);
app.get('/auth/register', createUserController);
app.post('/user/register', storeUserController);
app.post('/user/login', loginUserController);
app.get('/auth/logout', logoutController);
app.get('/auth/login', loginController);

let port = process.env.PORT;
if (port == null || port == "") {
	port = 8000;
}
app.listen(port);
