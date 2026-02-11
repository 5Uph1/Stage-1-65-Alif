// Main Server File - index.js 
import express from 'express'
import session from 'express-session';
import multer from 'multer';
import path from 'path';

// Import Route Handler
import { login, register, handleLogin, handleRegister, logout } from './src/assets/scripts/auth.js'
import { dataLaptop, getLaptop, updateLaptop, addLaptop, deleteLaptop } from './src/assets/scripts/laptop.js'

const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', 'src/views')

// Middleware
app.use("/assets", express.static('src/assets'))
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assets/images/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })


// Home Route
app.get('/', (req, res) => {
    const user = req.session.user;

    if (!req.session.user) {
        res.redirect('/login')
    }

    res.render('index', user)
})
app.get('/contact-us', (req, res) => {
    res.render('contact-us')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Auth Route
app.get('/login', login)
app.post('/login', handleLogin)

app.get('/register', register)
app.post('/register', handleRegister)

app.get('/logout', logout)

// My Laptop Route
app.get('/my-laptop', dataLaptop)
app.post('/my-laptop', upload.single('upload'), addLaptop)
app.get('/my-laptop/edit/:id', getLaptop)
app.post('/my-laptop/update', upload.single('upload'), updateLaptop)
app.post('/my-laptop/delete/:id', deleteLaptop)

