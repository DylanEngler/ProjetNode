const fs = require('fs')
module.exports = function(test){
    fs.appendFile('resultat.txt',test,(err) => {
        if (err) throw err
    })
}