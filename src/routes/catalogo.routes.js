import { Router } from 'express';
import { pool } from '../config/dbcConfig.js';
const router = Router()


router.get('/catalogo',async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM mangas')

      console.log(rows);
      // Extraer categorías únicas
      const categorias = [...new Set(rows.map(manga => manga.categoria))];
      res.render('catalogo', { mangas: rows, categorias}); // Pasar los datos a la vista, incluyendo el usuario
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error interno del servidor' });
    }
})



export default router