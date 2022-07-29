import express from 'express'
import { suma } from './controladores/control.js'
import { Sequelize, DataTypes, Op } from 'sequelize'
import { 
  getUsers,
  getUser
 } from './controladores/control.js'
import db from './db/conn.js'
const app = express()
const port = 3000


app.get('/users', getUsers)
app.get('/user', getUser)

// async (req, res) => { // rutas - routes
//   console.log("Listar usuarios")
//   let resultadoSuma = suma(2,4)
//   console.log("resultadoSuma", resultadoSuma)
//   let objeto = { 
//     nombre: 'Fran',
//     resultadoSuma
// }
  // const sequelize = new Sequelize('dbname', 'root', 'test', {
  //   host: 'localhost',
  //   dialect: 'mysql'
  // });
  // try {
  //   await sequelize.authenticate();
  //   console.log('Connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error.message);
  // }

  // const User = sequelize.define('user', {
  //   // Model attributes are defined here
  //   id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true
  //   },
  //   name: {
  //     type: DataTypes.STRING
  //     // allowNull defaults to true
  //   }
  // });
  // await User.create({ name:"Jane" })
//   let resultado = await User.findAll() // SELECT * from
//   resultado.forEach(function(usuario){
//     const { id, name } = usuario.dataValues
//     console.log("id: ", id)
//     console.log("name: ", name)
//   })

//   let unoSolo = await User.findAll({
//     where: {
//       id: 2
//   }}) 

//   let eliminado = await User.destroy({
//     where: {
//       id: {
//         [Op.or]: [13, 14]
//       }
//     }
//   });

//   await User.update({ name: "Fran" }, {
//     where: {
//       name: 'Pepe'
//     }
//   });
//   // CRUD
//   // Create, Read, Update, Delete
//   // const fran = await User.create({ name: "Fran" })
//   // console.log(fran.name) // Fran
//   // fran.name = 'Pepe'// hasta este punto no está en BD
//   // await fran.save() // aqui si está en Base de datos

// // console.log("eliminado", eliminado)
//   // console.log("unoSolo", unoSolo)
//   // console.log( JSON.stringify(resultado, null, 2) )
  
//   res.json(resultado)
// })

app.post('/usuarios', (req, res) => { // rutas
    console.log("Entrando por metodo post")
    console.log("Creando usuario...")
    let objeto = {
        id: "1234",
        nombre: "Fran"
    }
    res.json(objeto)
  })

app.listen(port, async() => {
  await db.sequelize
  console.log(`Example app listening on port ${port}`)
})