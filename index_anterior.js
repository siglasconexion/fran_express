// var moment = require("moment")
import moment from 'moment';

var a = 5
a = "hola"

var array =  [
    {
        saludo: "Hola"
    },
    {
        saludo: "Hello"
    },    
]
array.forEach( function(element, i){
    console.log(element)
    console.log(i)
    // console.log(element.saludo)
} )
console.log(array)
console.log(moment().format())
console.log("Hola fran, solamente guardo y aparece el resultado")
