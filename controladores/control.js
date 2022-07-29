import { User } from '../db/models/User.js'
export var suma = (a, b) => a + b

export const getUsers = async (req, res) => { // rutas - routes
    const data = await User.findAll()
   res.json(data)
 }

 export const getUser = async (req, res) => { // rutas - routes
    let unoSolo = await User.findAll({
            where: {
              id: 15
          }}) 
   res.json(unoSolo)
 }