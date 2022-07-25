import express from 'express'
import { suma } from './controladores/control.js'

const app = express()
const port = 3000

app.get('/usuarios', (req, res) => { // rutas - routes
  console.log("Listar usuarios")
  let resultadoSuma = suma(2,4)
  console.log("resultadoSuma", resultadoSuma)
  let objeto = { 
    nombre: 'Fran',
    resultadoSuma
}
  res.json(objeto)
})
app.post('/usuarios', (req, res) => { // rutas
    console.log("Entrando por metodo post")
    console.log("Creando usuario...")
    let objeto = {
        id: "1234",
        nombre: "Fran"
    }
    res.json(objeto)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})