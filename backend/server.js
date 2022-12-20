const express = require('express')
const mongoose = require('mongoose')
const snippetRoutes = require('./routes/snippets')
const userRoutes = require('./routes/user')
require('dotenv').config()

const app = express()


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(express.json())


app.use('/api/snippets', snippetRoutes)
app.use('/api/user', userRoutes)



app.get('/', (req, res) => res.send('Hello World!'))
app.get('/test', (req, res) => res.send('testing'))

mongoose.set("strictQuery", false);


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("CONNECT TO DATABASE")
    app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
}).catch((err) => {
    console.log(err)
})




