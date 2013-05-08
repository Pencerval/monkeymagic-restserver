var mongoose = require('mongoose');
mongoose.connect('localhost', 'monkey');

var monkeySchema = mongoose.Schema({
    name   : {type : String, required : true},
    birth  : {type : Date, required : true},
    gender : {type: Number, required: true},
    skin : {type: Number}
});

var Monkey = mongoose.model('monkey', monkeySchema);

// INDEX
// Should map to GET /models/
exports.findAll = function(req, res) {
    Monkey.find(function (err, monkeys) {
        if (err) return errorHandler(err, res); // TODO handle err
        res.send(monkeys);
    });
};

// SHOW
// Should map to GET /models/:id
exports.findById = function(req, res) {
    var id = req.params.id;
    Monkey.findById(id, function(err, monkey) {
        if (err) return errorHandler(err, res); // TODO handle err
        res.send(monkey);
    });
}

// CREATE
// Should map to POST /models
exports.addModel = function(req, res) {
    var monkey = new Monkey(req.body);
    monkey.save(function(err) {
        if (err) return errorHandler(err, res); // TODO handle err
        res.send(monkey);
    });
};

// UPDATE
// Should map to PUT /models/:id
exports.updateModel = function(req, res) {
    var id = req.params.id;
    Monkey.findById(id, function(err, monkey) {
        if (err) return errorHandler(err, res); // TODO handle err
        monkey.update(req.body, function(err) {
            if (err) {}
            res.send(monkey);
        });
    });
};

// DELETE
// Should map to DELETE /models/:id
exports.deleteModel = function(req, res) {
    var id = req.params.id;
    Monkey.findById(id, function(err, monkey) {
        monkey.remove(function (err) {
            if (err) return errorHandler(err, res); // TODO handle err
            res.send(monkey);
        });
    });
};

// ERRORS
function errorHandler(err, res) {
    res.send(err);
}
