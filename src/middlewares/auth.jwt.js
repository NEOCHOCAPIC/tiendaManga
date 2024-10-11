/*Una vez que el token está guardado en una cookie, necesitas un middleware para verificar 
que el usuario esté autenticado y extraer la información del token para usarla en las vistas */
import jwt from 'jsonwebtoken';
import JWTConfig from '../config/variableJWT.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt; // Lee la cookie llamada 'jwt'

    if (!token) {
        console.log("No hay token en las cookies");
        req.user = null; // No hay token, no hay usuario
        return next();
    }

    console.log("Verificando token:", token);
    console.log("Usando clave secreta:", JWTConfig.secret); // Verifica que esta sea la misma usada al firmar

    jwt.verify(token, JWTConfig.secret, (err, decoded) => {
        if (err) {
            console.log("Error al verificar el token:", err); // Esto te dará más detalles sobre el error
            req.user = null;
            return next();
        }

        console.log("Token decodificado:", decoded);
        req.user = decoded; // Almacena la información del usuario en req.user
        next();
    });
};


export const redirectIfAuthenticated = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        // Verificar si el token es válido
        jwt.verify(token, JWTConfig.secret, (err, decoded) => {
            if (err) {
                // Si hay un error al verificar el token, seguimos con el flujo normal
                return next();
            }

            // Si el token es válido, redirigir al usuario a otra página
            return res.redirect('/'); // Cambia la ruta según lo que prefieras
        });
    } else {
        // Si no hay token, continuamos con la solicitud
        next();
    }
};


