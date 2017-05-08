function ConnectionManager() {

    var events = require('events');
    var eventEmitter = new events.EventEmitter();
    var winston = require("winston");

    this.connect = function() {
        var MongoClient = require('mongodb').MongoClient;
        var Logger = require('mongodb').Logger;

        var url = "mongodb://std_user:Gd+CsYxn8_PE@ds121091.mlab.com:21091/student_oto";
        
        
		// Use connect method to connect to the Server
        MongoClient.connect(url, function(err, db) {
            if(err){
                //eventEmitter.emit("connection-error");
                //winston.info("Database connection is failed !");
                console.log("DB connection error on connection_manager function side.");
            }
            console.log("DB connection successful on connection_manager function side.");
            //winston.info("Database connection is successful");
            //eventEmitter.emit("connection-successful",db);
        });

    };
    
    this.onConnectSuccessfully = function(successful) {
        eventEmitter.on("connection-successful", successful);
    };

    this.onError = function(error) {
        eventEmitter.on("connection-error",error);
    };
}

module.exports = ConnectionManager;