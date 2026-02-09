import express from 'express'
import { Pool } from 'pg'

const db = new Pool({
    user: 'postgres',
    password: 'alifsufim',
    host: 'localhost',
    port: 5432,
    database: 'personal-web-65',
    max: 20,
})

const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', 'src/views')

app.use("/assets", express.static('src/assets'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/my-laptop', dataLaptop)

app.post('/my-laptop', addLaptop)

app.get('/my-laptop/edit/:id', getLaptop)

app.post('/my-laptop/update', updateLaptop)

app.post('/my-laptop/delete/:id', deleteLaptop)

app.get('/contact-us', (req, res) => {
    res.render('contact-us')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Display Data Laptop
async function dataLaptop(req, res) {
    try {
        const query = "SELECT *, TO_CHAR(tanggal_beli, 'DD-MM-YYYY') AS tanggal_rapi FROM laptops ORDER BY id ASC";
        const result = await db.query(query);

        res.render('my-laptop', { result })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

// Display edit Data Laptop by id
async function getLaptop(req, res) {
    try {
        const id = req.params.id;

        const query = `SELECT id, nama, TO_CHAR(tanggal_beli, 'YYYY-MM-DD') AS tanggal_input, deskripsi, monitor_bagus, keyboard_bagus, casing_bagus FROM laptops where id= ${id}`;
        const result = await db.query(query);
        // console.log(result.rows);

        res.render('my-laptop-edit', { result })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

// Update Data Laptop by id
async function updateLaptop(req, res) {
    try {
        const { id, namaLaptop, tanggalBeli, deskripsi, monitorBagus, keyboardBagus, casingBagus } = req.body;
        const laptop = {
            id: id,
            namaLaptop: namaLaptop,
            tanggalBeli: tanggalBeli,
            deskripsi: deskripsi,
            monitorBagus: monitorBagus === 'option1' ? true : false,
            keyboardBagus: keyboardBagus === 'option2' ? true : false,
            casingBagus: casingBagus === 'option3' ? true : false,
        };

        const query = `UPDATE laptops SET nama='${laptop.namaLaptop}', tanggal_beli='${laptop.tanggalBeli}', deskripsi='${laptop.deskripsi}', monitor_bagus=${laptop.monitorBagus}, keyboard_bagus=${laptop.keyboardBagus}, casing_bagus=${laptop.casingBagus} WHERE id=${laptop.id}`;
        const result = await db.query(query);
        console.log(result);
        res.redirect('/my-laptop')
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

// Add Data Laptop
async function addLaptop(req, res) {
    try {
        const { namaLaptop, tanggalBeli, deskripsi, monitorBagus, keyboardBagus, casingBagus } = req.body;
        const laptop = {
            namaLaptop: namaLaptop,
            tanggalBeli: tanggalBeli,
            deskripsi: deskripsi,
            monitorBagus: monitorBagus === 'option1' ? true : false,
            keyboardBagus: keyboardBagus === 'option2' ? true : false,
            casingBagus: casingBagus === 'option3' ? true : false,
        };
        const query = `INSERT INTO laptops (nama,tanggal_beli,deskripsi,user_id,monitor_bagus,keyboard_bagus,casing_bagus) VALUES ('${laptop.namaLaptop}','${laptop.tanggalBeli}','${laptop.deskripsi}',1,${laptop.monitorBagus},${laptop.keyboardBagus},${laptop.casingBagus})`;
        const result = await db.query(query);
        console.log(result);
        res.redirect('/my-laptop');
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

// Delete Data Laptop
async function deleteLaptop(req, res) {
    try {
        const id = req.params.id;
        const query = `DELETE FROM laptops WHERE id=${id}`;
        const result = await db.query(query);
        console.log(result);
        res.redirect('/my-laptop');
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}