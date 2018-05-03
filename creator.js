const program = require('commander')
const axios = require('axios')
const inquirer = require('inquirer')
const ecriture = require('./ecriture')
const lien = 'https://gateway.marvel.com/v1/public/'
const code_verif = 'ts=1&apikey=1dfbefadf2a95439362a3c18bc9ef646&hash=fdc146bf317b6191b2bb9cbd6f27d2b1'
var id = ''
function creator(testt){
    const nom = testt
        inquirer.prompt([{
            type: 'input',
            message: 'début du nom du créateur',
            name: 'titre'
        }]).then(test => {
            console.log(test.titre)
            const variable = `creators?nameStartsWith=${test.titre}&limit=100&`
            axios.get(lien+variable+code_verif)
                .then(function ({ data:{data:{results}}}) {
                    for(let i=0; i<results.length;i++) {
                    if (results[i].title == nom){
                        id = results[i].id
                        }
                    }
                    if(id==""){
                        id = testt
                    }
                    const variable = "creators/"
                    inquirer.prompt([{
                        type:'rawlist',
                        message:'Que voulez vous voir à propos de votre personnage',
                        name:'choix',
                        choices:[
                            'Series',
                            'Events',
                            'Stories',
                            'Comics',
                            'Tout'
                        ]
                    }]).then(answers => {
                        if(answers.choix=='Series'){
                            axios.get(lien+variable+id+"/series?"+code_verif)
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
                                        test = ' nom : ' + results[i].title + ' , id : ' + results[i].id + '\n'
                                        ecriture(test)
                                    }
                                }else {
                                    for(let i=0; i<results.length;i++) { 
                                        console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                    }
                                }})
                            })
                        }
                        else if (answers.choix=='Events'){
                            axios.get(lien+variable+id+"/events?"+code_verif)
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
                                        test = ' nom : ' + results[i].title + ' , id : ' + results[i].id + '\n'
                                        ecriture(test)
                                    }
                                }else {
                                    for(let i=0; i<results.length;i++) { 
                                        console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                    }
                                }})
                            })
                        }
                        else if (answers.choix=='Stories'){
                            axios.get(lien+variable+id+"/stories?"+code_verif)
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
                                        test = ' nom : ' + results[i].title + ' , id : ' + results[i].id + '\n'
                                        ecriture(test)
                                    }
                                }else {
                                    for(let i=0; i<results.length;i++) { 
                                        console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                    }
                                }})
                            })
                        }
                        else if (answers.choix=='Comics'){
                            axios.get(lien+variable+id+"/comics?"+code_verif)
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
                                        test = ' nom : ' + results[i].title + ' , id : ' + results[i].id + '\n'
                                        ecriture(test)
                                    }
                                }else {
                                    for(let i=0; i<results.length;i++) { 
                                        console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                    }
                                }})
                            })
                        }
                        else {
                            axios.get(lien+variable+id+"?"+code_verif)
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
                                    test ="\n seires :"
                                    ecriture(test)
                                    for (let j= 0; j<results[0].series.items.length;j++){
                                        test = results[0].series.items[j].name+'\n'
                                        ecriture(test)
                                    }
                                    test ="\n stories :"
                                    ecriture(test)
                                    for (let j= 0; j<results[0].stories.items.length;j++){
                                        test = results[0].stories.items[j].name+'\n'
                                        ecriture(test)
                                    }
                                    test =" \n comics : "
                                    ecriture(test)
                                    for (let j= 0; j<results[0].comics.items.length;j++){
                                        test = results[0].comics.items[j].name+'\n'
                                        ecriture(test)
                                    }
                                    test ="\n events : "
                                    ecriture(test)
                                    for (let j= 0; j<results[0].events.items.length;j++){
                                        test = results[0].events.items[j].name+'\n'
                                        ecriture(test)
                                    }
                                }else {
                                    console.log("\n series :")
                                    for (let j= 0; j<results[0].series.items.length;j++){
                                        console.log( results[0].series.items[j].name)
                                    }
                                    console.log("\n stories :")
                                    for (let j= 0; j<results[0].stories.items.length;j++){
                                        console.log( results[0].stories.items[j].name)
                                    }
                                    console.log(" \n comics : ")
                                    for (let j= 0; j<results[0].comics.items.length;j++){
                                        console.log( results[0].comics.items[j].name)
                                    }
                                    console.log("\n events : ")
                                    for (let j= 0; j<results[0].events.items.length;j++){
                                        console.log( results[0].events.items[j].name)
                                    }
                                }})
                                    
                                }
                            )
                        }
                    });
                    })
                .catch(function (error) {
                    console.log(error);
                })})
            ;
}
module.exports = creator