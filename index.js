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
    res.render('my-laptop', { laptopData })
})

app.get('/contact-us', (req, res) => {
    res.render('contact-us')
})

app.post('/my-laptop', addLaptop)

app.post('/my-laptop/:id', deleteLaptop)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

let laptopData = [
    {
        id: 1,
        namaLaptop: "Yanto LED",
        tanggalBeli: "2020-05-06",
        deskripsi: "Bisa menyala",
        kondisi: {
            monitorBagus: true,
            keyboardBagus: false,
            casingBagus: false,
        }
    },
    {
        id: 2,
        namaLaptop: "Agus Monitor",
        tanggalBeli: "2022-05-06",
        deskripsi: "Keyboard menyala",
        kondisi: {
            monitorBagus: false,
            keyboardBagus: true,
            casingBagus: false,
        }
    },
]
let idLaptop = 3

function addLaptop(req, res) {
    const { namaLaptop, tanggalBeli, deskripsi, monitorBagus, keyboardBagus, casingBagus } = req.body;
    const laptop = {
        id: idLaptop++,
        namaLaptop: namaLaptop,
        tanggalBeli: tanggalBeli,
        deskripsi: deskripsi,
        kondisi: {
            monitorBagus: monitorBagus === 'option1' ? true : false,
            keyboardBagus: keyboardBagus === 'option2' ? true : false,
            casingBagus: casingBagus === 'option3' ? true : false,
        }
    };

    laptopData.push(laptop);
    console.log(laptopData);
    res.redirect('/my-laptop');
}

function deleteLaptop(req, res) {
    const id = parseInt(req.params.id);
    laptopData = laptopData.filter((laptop) => laptop.id !== id);
    res.redirect('/my-laptop');
}