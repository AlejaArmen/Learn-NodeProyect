const fs = require('node:fs')

console.log('Leyendo el primer archivo con Node.js')
const primerText = fs.readFile('./archivo.txt', 'utf-8', (err, text)=>{
    console.log(text)
})
console.log(primerText)

console.log('Leyendo el segundo archivo----')
const secondText = fs.readFile('./archivo2.txt', 'utf-8', (err, text) =>{
    console.log(text)
})
console.log(secondText)
