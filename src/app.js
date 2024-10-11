import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import {verifyToken} from './middlewares/auth.jwt.js'
import catalogoRoutes from './routes/catalogo.routes.js'
import indexRoutes from './routes/index.routes.js'
import carritoRoutes from './routes/carrito.routes.js'
// se inicializa express
const app = express();

// manejo del motor de plantillas ejs
app.set('views', './src/views') // donde se ubica
app.set('view engine', 'ejs') // motor seleccionado

// middlewares para procesar datos del formulario de manera correcta
app.use(express.urlencoded({extended: false})) // para procesar formularios , y el false para permitir solo arrays o string
app.use(express.json())// permite recibir datos JSON en el cuerpo de una solicitud HTTP

// middleware para cookies
app.use(cookieParser())


// middleware para autenticacion
app.use(verifyToken)
// Middleware para agregar el usuario a todas las vistas EJS
app.use((req, res, next) => {
    res.locals.user = req.user || null;  // Si hay un usuario autenticado, lo pasa a las vistas
    next();
});

// Obtener _dirname para ES Modules
const _filename = fileURLToPath(import.meta.url) // nombre archivo actual
const _dirname = path.dirname(_filename)// directorio de mi archivo

// servir archivos estaticos desde public
app.use(express.static(path.join(_dirname, 'public')))




// Rutas 
app.use(authRoutes)
app.use(catalogoRoutes)
app.use(indexRoutes)
app.use(carritoRoutes)


// middleware para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).render('notFound',{
        message: 'Pagina no encontrada'
    })
})

export default app;