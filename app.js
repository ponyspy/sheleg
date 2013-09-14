var fs = require('fs');
var express = require('express');
    var app = express();

var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
mongoose.connect('localhost', 'main');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
// app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
app.use(express.bodyParser({ keepExtensions: true, uploadDir:__dirname + '/uploads' }));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(app.router);


// -------------------
// *** Model Block ***
// -------------------


var userSchema = new Schema({
   login: String,
    password: String,
    name: String,
   email: String,
  status: {type: String, default: 'User'},
    date: {type: Date, default: Date.now},
});

var workSchema = new Schema({
  tag: String,
  ru: {
    description: String
  },
  en: {
    description: String
  },
  image: String,
  date: {type: Date, default: Date.now}
});

var projectSchema = new Schema({
    ru: {
      title: String,
      s_title: String,
      description: String
    },
    en: {
      title: String,
      s_title: String,
      description: String
    },
    tag: String,
    date: {type: Date, default: Date.now},
    images: [String],
});

var postSchema = new Schema({
    ru: {
      title: String,
      s_title: String,
      body: String
    },
    en: {
      title: String,
      s_title: String,
      body: String
    },
    tag: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    date: {type: Date, default: Date.now},
    images: [String],
});



var User = mongoose.model('User', userSchema);
var Work = mongoose.model('Work', workSchema);
var Project = mongoose.model('Project', projectSchema);
var Post = mongoose.model('Post', postSchema);


// ------------------------
// *** Midleware Block ***
// ------------------------


function checkAuth (req, res, next) {
  if (req.session.user_id)
    next();
  else
    res.redirect('/login');
}


// ------------------------
// *** Main Block ***
// ------------------------


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/works/:type', function(req, res) {
  res.render('works');
});

app.get('/works/:type/:id', function(req, res) {
  res.render('works/work.jade');
});

app.get('/projects/:type', function(req, res) {
  res.render('project');
});


// ------------------------
// *** Login Block ***
// ------------------------


app.get('/auth', checkAuth, function (req, res) {
  res.render('auth');
});

app.get('/auth/add/work', checkAuth, function (req, res) {
  res.render('auth/add/work.jade');
});

app.post('/auth/add/work', function (req, res) {
  var post = req.body;
  var files = req.files;
  var work = new Work();

  work.tag = post.tag;
  work.ru.description = post.ru.description;
  if (post.en)
    work.en.description = post.en.description;

  fs.readFile(files.photo.path, function (err, data) {
    var newPath = __dirname + '/public/images/works/' + work._id + '.jpg';
    fs.writeFile(newPath, data, function (err) {
      work.image = '/images/work/' + work._id + '.jpg';
      work.save(function() {
        fs.unlink(files.photo.path);
        res.redirect('back');
      })
    });
  });
});

app.get('/auth/add/project', checkAuth, function (req, res) {
  res.render('auth/add/project.jade');
});

app.post('/auth/add/project', function (req, res) {
  var post = req.body;
  var files = req.files;
  var project = new Project();

  project.tag = post.tag;
  project.ru.title = post.ru.title;
  project.ru.s_title = post.ru.s_title;
  project.ru.description = post.ru.description;

  if (post.en) {
    project.en.title = post.en.title;
    project.en.s_title = post.en.s_title;
    project.en.description = post.en.description;
  }

  fs.readFile(files.photo.path, function (err, data) {
    var newPath = __dirname + '/public/images/project/' + work._id + '.jpg';
    fs.writeFile(newPath, data, function (err) {
      work.image = '/images/work/' + work._id + '.jpg';
      work.save(function() {
        fs.unlink(files.photo.path);
        res.redirect('back');
      })
    });
  });
});


app.get('/auth/add/post', checkAuth, function (req, res) {
  res.render('auth/add/post.jade');
});


app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', function(req, res) {
  var post = req.body;

  User.findOne({ 'login': post.login, 'password': post.password }, function (err, person) {
    if (!person) return res.redirect('back');
    req.session.user_id = person._id;
    req.session.status = person.status;
    req.session.login = person.login;
    res.redirect('/auth');
  });
});


app.get('/logout', function (req, res) {
  delete req.session.user_id;
  delete req.session.login;
  delete req.session.status;
  res.redirect('back');
});


app.get('/registr', function(req, res) {
  if (!req.session.user_id)
    res.render('registr');
  else
    res.redirect('/');
});


app.post('/registr', function (req, res) {
  var post = req.body;

  var user = new User({
    login: post.login,
    password: post.password,
    email: post.email,
    name: post.name,
  });

  user.save(function(err, user) {
    if(err) {throw err;}
    console.log('New User created');
    req.session.user_id = user._id;
    req.session.login = user.login;
    req.session.status = user.status;
    res.redirect('/login');
  });
});


// ------------------------
// *** Other Block ***
// ------------------------


app.get('/error', function (req, res) {
  res.render('error');
});

app.get('*', function(req, res){
  res.render('error');
});


app.listen(3000);
console.log('http://127.0.0.1:3000')