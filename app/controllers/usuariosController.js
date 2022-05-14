'use strict';

 // Dependencies
 const async = require('co')

 exports.isAlive = async.wrap((req, res, next) => {
     try {
         console.log('Alive!!!!\n\n\n\n');
        res.status(200).json('Alive!!!')
     }
     catch (e) {
        next(e)
     }
 })