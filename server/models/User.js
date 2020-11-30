const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    id: {type: String},
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token: {type: String}
})

module.exports = model('User', schema)