import {pool} from '../config/dbcConfig.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import jwtConfig from '../config/variableJWT.js'

class metodoAuth {
    constructor() {

    }
    getLogin(req, res) {
        res.render('auth/login')
    }
    getSignup(req, res){
        res.render('auth/signup')
    }
    async postLogin(req, res){
        try {
          const {email, password} = req.body
          const [user] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
          if(user.length > 0 && await decodedPass(password,user)) {
            // generar el token 
            const token = jwt.sign({id: user[0].id, email: user[0].email, nombre: user[0].nombre},jwtConfig.secret, {expiresIn:jwtConfig.expiresIn})
            console.log(token);
            console.log('paso');
                // Guardar el token en una cookie (recomendación: usar 'httpOnly' para mayor seguridad)
                res.cookie('jwt', token, { httpOnly: true });
                res.redirect('/')
          }
          
        } catch (error) {
        console.log(error);
        res.status(500).send('error en el servidor')
        }
    }
    async postSignup(req, res){

        try {
        const {nombre, email, password} = req.body
        const [user] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
          console.log(user.length);
          if(user.length > 0) {
            res.status(400).render('auth/signup', {
                errors: 'El correo ya se encuentra registrado'
            })
          }
          // hashear Password
          const hashPassword = await hashPass(password)
          await pool.query('INSERT INTO usuarios (nombre, email, password) VALUES (?,?,?)',[nombre,email,hashPassword])
          res.redirect('/login')
        } catch (error) {
        console.log(error);
        res.status(500).send('error en el servidor')
        }
    }
    logout(req, res){
        res.clearCookie('jwt', { httpOnly: true }); // Asegúrate de que el nombre coincida
        res.redirect('/login'); // Redirige al login u otra página como la de inicio
    }

}
async function hashPass(password) {
    const newPass = await bcrypt.hash(password,10)
     return newPass
}
async function decodedPass(password,user) {
    
    return await bcrypt.compare(password,user[0].password)
}

export default metodoAuth