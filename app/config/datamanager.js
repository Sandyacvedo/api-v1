'use strict'

let mysql = require('mysql2');
require('dotenv').config()
let config = require('./database')

class Mysql {
    constructor() {
        this.con = null
        this.db = config[process.env.DATABASE]
        this.wp = null
        this.conf = config[process.env.DATABASE]
    }

    open () {

    }

    transaction() {
        return this.con.beginTransaction
    }

    getInstance() {
        return mysql.createPool({
            connectTimeout: 10000,
            connectionLimit: 10,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database,
            host: config.mysql.host
        })
    }

    commit() {
        return this.con.commit
    }

    rollback() {
        return this.con.rollback
    }

    query(q) {
        return new Promise(async (resolve, reject) => {
            this.getInstance().getConnection((err, conn) => {
                if (err) return reject(err)

                console.log('OPEN MYSQL ', config.mysql.database)
                console.log('db sql =>', q)
                conn.query(q, (err, res, fields) => {
                    if (err) {
                        conn.destroy()
                        return reject(err)
                    }

                    conn.destroy()
                    resolve(res)
                })
            })
        })
    }

    open_r() {
    }

    open_rw() {

    }

    close() {
        mysql.Cl
    }
}

module.exports = Mysql