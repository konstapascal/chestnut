const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keySchema = new Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    length: {type: Number, required: true},
    publicKeyHash: {type: String, required: true},
    privateKeyHash: {type: String, required: true},
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})


//Especial method available in mongoose 
module.exports = mongoose.model('Key', keySchema);

