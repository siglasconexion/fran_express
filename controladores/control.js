import { User } from '../db/models/User.js'
export var suma = (a, b) => a + b

export const getUsers = async (req, res) => { // rutas - routes
    const data = await User.findAll() // SELECT * FROM users
    if(data.length <= 0){
      res.json({
        message: 'Results not found'
      })
      return
    }
   res.json(data)
 }

 export const getUser = async (req, res) => { // rutas - routes
    let unoSolo = await User.findAll({
            where: {
              id: req.query.idBody // 15
          }}) 
    if(unoSolo.length <= 0){
      res.json({
        message: 'Results not found'
      })
      return
    }
   res.json(unoSolo)
 }

 export const createUser = async (req, res) => {
  const createdUser = await User.create({ name: req.body.name })
  res.json({ message: createdUser })
 }

 export const updateUser = async (req, res) => {
  const obj = req.body
  await User.update(obj, {
    where: {
      id: req.body.id // 16
    }
  });
  res.json({ message: "User Update successfully" })
 }

 export const deleteUser = async (req, res) => {
  const id = req.body.id
  await User.destroy({
    where: {
      id
    }
  });
  res.json({ message: "User deleted successfully" })
 }