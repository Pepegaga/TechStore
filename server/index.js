const express = require('express')
const config = require('config')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/options', require('./routes/options.routes'))
app.use('/api/products', require('./routes/products.routes'))
app.use('/api/cart', require('./routes/cart.routes'))
app.use('/api/favourite', require('./routes/favourite.routes'))
app.use('/api/search', require('./routes/search.routes'))
app.use('/api/comments', require('./routes/comments.routes'))
app.use('/api/orders', require('./routes/orders.routes'))
app.use('/api/categories', require('./routes/categories.routes'))
app.use('/api/users', require('./routes/users.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        app.listen(PORT, () => console.log(`kek${PORT}`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

// const express = require('express')
// const {graphqlHTTP} = require('express-graphql')
// const schema = require('./schema/schema')
// const mongoose = require('mongoose')

// const app = express()
// const PORT = 5000

// mongoose.connect('mongodb+srv://pepega:pokemon4ik@cluster0.w9dbg.mongodb.net/test-db?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true
// }))

// const dbConnection = mongoose.connection
// dbConnection.on('error', err=> console.log(`Connection error ${err}`))
// dbConnection.once('open', ()=> console.log('Connected to db'))

// app.listen(PORT, err=>{
//     err ? console.log(error) : console.log('Server started at port:'+PORT)
// })
