const fs = require('node:fs') //a partir de node 16 se debe de agregar node: para que funcione

const stats = fs.statSync('./archivo.txt')

console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size
)