var express = require('express');
var monkey = require('./models/monkey');

var app = express();

app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

app.get('/monkey', monkey.findAll);
app.get('/monkey/:id', monkey.findById);
app.post('/monkey', monkey.addModel);
app.put('/monkey/:id', monkey.updateModel);
app.delete('/monkey/:id', monkey.deleteModel);


var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');



if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
}
else{
    var mongo = {
        "hostname":"localhost",
        "port":27017,
        "db":"monkey"
    }
}
var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'monkey');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}
var mongourl = generate_mongo_url(mongo);








var mongoose = require('mongoose');
mongoose.connect(mongourl, 'monkey');





app.listen(port);
console.log('Listening on port 3000...');