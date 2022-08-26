const {resolve, reject} = require('bluebird');
const mysql = require('../config/datamanager')

   

class Auth {

    constructor() {}

    getUsername(username){
        return new Promise(async (resolve, reject) => {
            let con = new mysql()
            try{
                let query = "SELECT * FROM usuarios WHERE usuario ='"+username.trim()+"'";
                let result = await con.query(query)
                resolve(result)
            }
            catch (error) {
                reject(error)
            }
            finally{
                con.close
            }
        })
    }

    registerUser(nombre, usuario, apellido, password){
        return new Promise(async (resolve, reject) => {
            let con = new mysql()
            try{
                let query = "INSERT INTO usuarios (nombre, usuario, apellido, password) values ('"+ nombre + "','"+ usuario +"','"+ apellido +"','"+password +"')"
                let result = await con.query(query);
                const mensaje = 'Usuario Creado Exitosamente!'
                resolve( mensaje )
            }
            catch (error) {
                reject(error)
            }
            finally{
                con.close   
            }
        })
    }

    findOne (usuario) {
        return new Promise(async (resolve, reject) => {
            let con = new mysql()
            try{
                let query = "SELECT * FROM usuarios WHERE usuario = '"+ usuario.trim() +"' "
                let result = con.query(query);
            resolve(result)
            }
            catch (error) {
                reject(error)
            }
            finally{
                con.close
            }
        })
    }
}

module.exports = Auth