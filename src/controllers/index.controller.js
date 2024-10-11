import { pool } from '../config/dbcConfig.js';
export const getIndex = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM mangas')
        res.render('index',{ mangas: rows})
    } catch (error) {
        console.log(error);
     res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.render('index')
}