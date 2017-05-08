var express = require('express'),
    assert = require('assert'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(__dirname + '/public'));


mongoose.connect('mongodb://st_user:Gd+CsYxn8_PE@ds121091.mlab.com:21091/student_oto');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error....'));
db.once('open', function callback(){
        console.log('studentface db opened');
        
    //     // following command is being tested
    //     var BlogPost = new Schema({
    //     teacher    : 'Joe',
    //     course     : 'math',
    //     stdID      : 1,
    //     grade      : 96
    // });
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;

// Message.findOne().exec(function(err, messageDoc){
//     mongoMessage = messageDoc.message;    
// });


app.get('/partials/:partialPath', function(req, res){
    res.render('partials/', + req.params.partialPath);
});

// app.get('*', function(req, res) {
//   res.render('index', {
//     mongoMessage: mongoMessage
//   });
// });

// var port = 3030;
// app.listen(port);
// console.log('Server is running, listening on port ' + port + '...');




// var connectionManager = new ConnectionManager();
// connectionManager.onConnectSuccessfully(function (db) {
//     //if connection success then execute this:
//     //.....
//     console.log('DB connection successful');
// });
// //check whether works
// connectionManager.onError(function () {
//     console.log('Database connection err');
// });
// connectionManager.connect();


//Find Documents with a Query Filter
//Add a query filter to find only documents which meet the query criteria.
// Only the documents which match 'a' : 3 should be returned
var findDocuments = function(db, callback) {
      // Get the documents collection
      var collection = db.collection('documents');
      // Find some documents
      collection.find({'ali': 3}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
        app.get('*', function(req, res) {
        res.render('index', {
        docs
      });
    });
  });      
}


app.get('*', function(req, res) {
  res.render('index', {
    mongoMessage: mongoMessage
  });
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Server is running, listening on port ' + port + '...');


