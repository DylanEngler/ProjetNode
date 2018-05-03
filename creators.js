const program = require('commander')
const axios = require('axios')
const inquirer = require('inquirer')
const ecriture = require('./ecriture')
const lien = 'https://gateway.marvel.com/v1/public/'
const code_verif = 'ts=1&apikey=1dfbefadf2a95439362a3c18bc9ef646&hash=fdc146bf317b6191b2bb9cbd6f27d2b1'
var id = ''
function creators(test){
const variable = 'creators?nameStartsWith='+test+'&limit=100&'
axios.get(lien+variable+code_verif)
.then(function ({ data:{data:{results}}}) {
    inquirer.prompt([{
        type:'rawlist',
        message:'Voulez-vous sauvegarder',
        name:'sauvegarde',
        choices:[
            'Oui',
            'Non'
        ]
    }]).then(answers => {if(answers.sauvegarde =='Oui'){
        for(let i=0; i<results.length;i++) {
            test = ' nom : ' + results[i].fullName + ' , id : ' + results[i].id + '\n'
            ecriture(test)
        }
    }else {
        for(let i=0; i<results.length;i++) { 
            console.log( ' nom : ' + results[i].fullName + ' , id : ' + results[i].id )
        }
    }})
})
.catch(function (error) {
    console.log(error);
})
;
}
module.exports = creators
