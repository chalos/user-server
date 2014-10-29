var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Client = {
    following_num: 0,
    following_id: []
};

var User = new Schema({
    active: { type: Boolean, required: true, default: true},
    type: { type: Object, require: true, default: Client},
    email: { type: String, required: true, unique: true},   //*
    name: { type: String, required: true, unique: true},    //*
    passwd: { type: String, require: true },                //*
    language: { type: String, require: true, default: "en"}, 
    // http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    paid_statement: {type: Boolean, require: true, default: false},
    changed_limited: {type: Number, require: false , default: 0},
    flow: {type: Number, require: true, default: 0},
// OPTIONAL 
    bigHead: {type: String, require: false },
    country: {type: String, require: false },
    //http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    phone: {type: String, require: false },
    sex: {type: String, require: false },
    bio: {type: String, require: false },
});

module.exports = User;
module.exports.queryAssert = ['_id','email','name'];
module.exports.addAssert = ['email', 'name', 'passwd'];

module.exports.updateForbindden = [
    '_id', 
    'flow', 
    'active',
    'type',
    'email', 
    'name', 
    'passwd',
    'paid_statement',
    'changed_limited',
    'flow'
];
