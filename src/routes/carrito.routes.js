import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.jwt.js';
import { pool } from '../config/dbcConfig.js';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/variableJWT.js';

const router = Router();

// Ruta para agregar productos al carrito
// carrito.routes.js
router.post('/agregar-carrito', async (req, res) => {
    const { productoId } = req.body; // Extraer el ID del producto del cuerpo de la solicitud
    const usuarioId = req.user.id; // Asegúrate de que req.user esté definido y tenga el id del usuario

    console.log('ID del producto:', productoId); // Agrega esto para verificar el ID

    try {
        if (!productoId) {
            return res.status(400).json({ message: 'El ID del producto es requerido.' });
        }

        // Aquí debes asegurarte de que el manga_id no sea null
        const [result] = await pool.query(
            'INSERT INTO carrito (usuario_id, manga_id, cantidad) VALUES (?, ?, ?)',
            [usuarioId, productoId, 1] // Asegúrate de que el productoId no sea null aquí
        );

        return res.status(200).json({ message: 'Producto agregado al carrito con éxito.' });
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        return res.status(500).json({ message: 'Error al agregar al carrito' });
    }
});

// Ruta para mostrar el carrito
router.get('/carrito', verifyToken, async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            console.error("error debes estar logueado")
            return res.status(401).redirect('/catalogo')
        }

        // Usar jwtConfig.secret en lugar de process.env.JWT_SECRET
        const decoded = jwt.verify(token, jwtConfig.secret);
        const usuario_id = decoded.id;

        // Obtener los productos del carrito del usuario
        const [carritoItems] = await pool.query(
            'SELECT c.cantidad, m.titulo, m.precio, m.portadaURL ' +
            'FROM carrito c ' +
            'JOIN mangas m ON c.manga_id = m.id ' +
            'WHERE c.usuario_id = ?',
            [usuario_id]
        );

        res.render('carrito', { carritoItems });
    } catch (error) {
        console.error('Error al mostrar el carrito:', error);
        res.status(500).json({ message: 'Error al mostrar el carrito.' });
    }
});
router.post('/actualizar-cantidad', async (req, res) => {
    const { productoId, nuevaCantidad } = req.body;
    const usuarioId = req.user.id; // Asegúrate de obtener el ID del usuario autenticado

    try {
        // Actualizar la cantidad en la base de datos
        await pool.query('UPDATE carrito SET cantidad = ? WHERE usuario_id = ? AND manga_id = ?', [nuevaCantidad, usuarioId, productoId]);
        res.json({ message: 'Cantidad actualizada correctamente.' });
    } catch (error) {
        console.error('Error al actualizar la cantidad:', error);
        res.status(500).json({ message: 'Error al actualizar la cantidad en el carrito.' });
    }
});

export default router;
