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

app.listen(3000);
console.log('Listening on port 3000...');