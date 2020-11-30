const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    id: {type: String},
    name: {type: String, required: true},
    description: {type: String, required: true},
    brand: {type: String}
})

module.exports = model('Goods', schema)