// configuracion de este archivo para manejar las variables de entorno extrayendolas y organizandolas
import { config } from 'dotenv'
// carga las variables de entorno de .env hacia proces.env
config()
export const PORT = process.env.PORT || 3000;
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'root'
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = process.env.DB_PORT || 3306
export const DB_NAME = process.env.DB_NAME || 'mangastore'
