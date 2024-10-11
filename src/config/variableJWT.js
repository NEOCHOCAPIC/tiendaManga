import { config } from 'dotenv';
config()

const jwtConfig = {
    secret: process.env.JWT_SECRET || 'clave1234', // Clave secreta para firmar el token
    expiresIn: process.env.JWT_EXPIRES_IN || '1h' // Tiempo de expiración del token
};

console.log('JWT Config Loaded:', jwtConfig); // Añade esta línea para depurar
console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Depuración para ver si se carga bien
console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);

export default jwtConfig;