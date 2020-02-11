const mongoose = require('mongoose');
const uniqueVailidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6},
    keys: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Key'}]
});


userSchema.plugin(uniqueVailidator);


module.exports = mongoose.model('User', userSchema);

