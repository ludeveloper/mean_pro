var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://std_user:Gd+CsYxn8_PE@ds121091.mlab.com:21091/student_oto';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});






var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {ali : 1}, {ali : 2}, {ali : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection succesfully :)");
    callback(result);
  });
}




// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');

// Connection URL
// var url = 'mongodb://std_user:Gd+CsYxn8_PE@ds121091.mlab.com:21091/student_oto';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server on app.js");

  insertDocuments(db, function() {
    db.close();
  });
});





// Add a query that returns all the documents.
// This query returns all the documents in the documents collection
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}




//Add the findDocument method to the MongoClient.connect callback:
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
// var url = 'mongodb://std_user:Gd+CsYxn8_PE@ds121091.mlab.com:21091/student_oto';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  insertDocuments(db, function() {
    findDocuments(db, function() {
      db.close();
    });
  });
});




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
  });      
}





//Update a document
//The following operation updates a document in the documents collection.
// The method updates the first document where the field a is equal to 2
// ..by adding a new field b to the document set to 1.
var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ "ali" : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}







// Next, update the callback function from MongoClient.connect to include the update method.
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
// var url = 'mongodb://std_user:Gd+CsYxn8_PE@ds121091.mlab.com:21091/student_oto';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  insertDocuments(db, function() {
    updateDocument(db, function() {
      db.close();
    });
  });
});




// Remove a document
// Remove the document where the field a is equal to 3.

var removeDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteOne({ "ali" : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    
}





// Add the new method to the MongoClient.connect callback function.
// var MongoClient = require('mongodb').MongoClient
//  , assert = require('assert');

// Connection URL
//var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  insertDocuments(db, function() {
    updateDocument(db, function() {
      removeDocument(db, function() {
        db.close();
      });
    });
  });
});

var indexCollection = function(db, callback) {
  db.collection('documents').createIndex(
    { "ali": 1 },
      null,
      function(err, result) {
        console.log(result);
        callback();
    }
  );
};





// Add the indexCollection method to your app:

// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');

// Connection URL
//var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server with MongoClient in app.js");

  insertDocuments(db, function() {
    indexCollection(db, function() {
      db.close();
    });
  });
});