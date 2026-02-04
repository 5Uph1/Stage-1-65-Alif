import express from 'express'
const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', 'src/views')

app.use("/assets", express.static('src/assets'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/my-laptop', (req, res) => {
    res.render('my-laptop')
})

app.get('/contact-us', (req, res) => {
    res.render('contact-us')
})

app.post('/kirim', (req, res) => {
    const coba = req.body.text;
    console.log('Masuk mas ' + coba)
    res.redirect('/?input=' + coba)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
