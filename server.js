// modules and enviroment variables.

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const getPartials = require('./middleware/getPartials')
const app = express()

// server routes.

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/products')
const userRouter = require('./routes/users')
const adminRouter = require('./routes/admin')

// server uses and sets and database.

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// launch server and set ends.

app.use(getPartials.error,getPartials.username,getPartials.username)
app.use('/', indexRouter)
app.use('/as', authRouter)
app.use('/a', adminRouter)
app.use('/p', productRouter)
app.use('/u', userRouter)

app.listen(process.env.PORT || 3000)