import bcrypt from "bcrypt";
import { Pool } from 'pg'

const db = new Pool({
    user: 'postgres',
    password: 'alifsufim',
    host: 'localhost',
    port: 5432,
    database: 'personal-web-65',
    max: 20,
})

// Display Login
export function login(req, res) {
    res.render('login')
}

// Display Register
export function register(req, res) {
    res.render('register')
}

// Login Process
export async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;

        const isRegistered = await db.query(`SELECT id,nama,email,password FROM users WHERE email='${email}'`);

        if (!isRegistered) {
            return res.redirect('/login')
        }

        const isMatch = await bcrypt.compare(password, isRegistered.rows[0].password)

        if (!isMatch) {
            return res.redirect('/login')
        }

        req.session.user = {
            id: isRegistered.rows[0].id,
            nama: isRegistered.rows[0].nama,
            email: isRegistered.rows[0].email
        }

        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }

}

// Register Process
export async function handleRegister(req, res) {
    try {
        const { username, email, password } = req.body;

        const isRegistered = await db.query(`SELECT * FROM users WHERE email='${email}'`);

        if (isRegistered) {
            res.redirect('/login')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO users( nama, email, password ) VALUES ('${username}', '${email}', '${hashedPassword}')`;
        const result = await db.query(query);
        res.redirect('/login')
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

export function logout(req, res) {
    req.session.destroy();

    res.redirect('/login')
}