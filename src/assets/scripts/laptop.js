import { Pool } from 'pg'

const db = new Pool({
    user: 'postgres',
    password: 'alifsufim',
    host: 'localhost',
    port: 5432,
    database: 'personal-web-65',
    max: 20,
})

// Display Data Laptop
export async function dataLaptop(req, res) {
    try {
        if (!req.session.user) {
            return res.status(404).send("Halaman Tidak Ditemukan")
        }

        const user_id = req.session.user.id;
        const query = `SELECT *, TO_CHAR(tanggal_beli, 'DD-MM-YYYY') AS tanggal_rapi FROM laptops WHERE user_id=${user_id} ORDER BY id ASC`;
        const result = await db.query(query);

        res.render('my-laptop', { result })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

// Display edit Data Laptop by id
export async function getLaptop(req, res) {
    try {
        const id = req.params.id;

        if (!req.session.user) {
            return res.status(404).send("Halaman Tidak Ditemukan")
        }

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
export async function updateLaptop(req, res) {
    try {
        // Cek apakah file berhasil diupload
        if (!req.file) {
            return res.status(400).send("Image upload failed");
        }

        const { id, namaLaptop, tanggalBeli, deskripsi, monitorBagus, keyboardBagus, casingBagus } = req.body;
        const laptop = {
            id: id,
            namaLaptop: namaLaptop,
            tanggalBeli: tanggalBeli,
            deskripsi: deskripsi,
            monitorBagus: monitorBagus === 'option1' ? true : false,
            keyboardBagus: keyboardBagus === 'option2' ? true : false,
            casingBagus: casingBagus === 'option3' ? true : false,
            gambarLaptop: req.file.filename,
        };

        const query = `UPDATE laptops SET nama='${laptop.namaLaptop}', tanggal_beli='${laptop.tanggalBeli}', deskripsi='${laptop.deskripsi}', monitor_bagus=${laptop.monitorBagus}, keyboard_bagus=${laptop.keyboardBagus}, casing_bagus=${laptop.casingBagus}, gambar='${laptop.gambarLaptop}' WHERE id=${laptop.id}`;
        const result = await db.query(query);
        return res.redirect('/my-laptop')
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

// Add Data Laptop
export async function addLaptop(req, res) {
    try {
        // Cek apakah file berhasil diupload
        if (!req.file) {
            return res.status(400).send("Image upload failed");
        }

        const { namaLaptop, tanggalBeli, deskripsi, monitorBagus, keyboardBagus, casingBagus } = req.body;
        const laptop = {
            namaLaptop: namaLaptop,
            tanggalBeli: tanggalBeli,
            deskripsi: deskripsi,
            id_user: req.session.user.id,
            monitorBagus: monitorBagus === 'option1' ? true : false,
            keyboardBagus: keyboardBagus === 'option2' ? true : false,
            casingBagus: casingBagus === 'option3' ? true : false,
            gambarLaptop: req.file.filename,
        };

        const query = `INSERT INTO laptops (nama,tanggal_beli,deskripsi,user_id,monitor_bagus,keyboard_bagus,casing_bagus,gambar) VALUES ('${laptop.namaLaptop}','${laptop.tanggalBeli}','${laptop.deskripsi}',${laptop.id_user},${laptop.monitorBagus},${laptop.keyboardBagus},${laptop.casingBagus},'${laptop.gambarLaptop}')`;
        const result = await db.query(query);
        res.redirect('/my-laptop');
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

// Delete Data Laptop
export async function deleteLaptop(req, res) {
    try {
        const id = req.params.id;
        const query = `DELETE FROM laptops WHERE id=${id}`;
        const result = await db.query(query);
        res.redirect('/my-laptop');
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}