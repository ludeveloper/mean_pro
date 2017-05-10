var express = require('express'),
    assert = require('assert');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);



//require('connection_manager');


// var messageSchema = mongoose.Schema({message: String});
// var Message = mongoose.model('Message', messageSchema);
// var mongoMessage;

// Message.findOne().exec(function(err, messageDoc){
//     mongoMessage = messageDoc.message;    
// });



//var connectionManager = require("connectionManager");
// connectionManager.connect();

// connectionManager.onConnectSuccessfully(function (db) {
//     //if connection success then execute this:
//     //.....
//     console.log('DB connection successful');
// });
// //check whether works
// connectionManager.onError(function () {
//     console.log('Database connection err');
// });


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
};


// app.get('*', function(req, res) {
//   res.render('index', {
//     mongoMessage: mongoMessage
//   });
// });

app.listen(config.port);
console.log('Server is running, listening on port ' + config.port + '...');


