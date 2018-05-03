#!/usr/bin/node
const program = require('commander')
const axios = require('axios')
const inquirer = require('inquirer')
const os = require("os");
const fs = require('fs')
const lien = 'https://gateway.marvel.com/v1/public/'
const code_verif = 'ts=1&apikey=1dfbefadf2a95439362a3c18bc9ef646&hash=fdc146bf317b6191b2bb9cbd6f27d2b1'
var id = ''
var test = ''
try {
    fs.writeFile('resultat.txt', '', (err) => {
    if (err) throw err
    })  

} catch (err) {
    console.error('ERR > ', err)
}

program
    .version('1.0.0', '-v, --version')
    .option('-c, --characters [DebutDuNomDuPersonnage]', 'Tous les personnages')
    .option('-x, --character [personnageID]', 'un personnage')
    .option('-o, --comics [DebutDuNomDuComics]', 'Tous les comics')
    .option('-m, --comic [comicID]', 'un comic')
    .option('-a, --creators [DebutNomDuCreateur]', 'Tous les créateurs')
    .option('-b, --creator [createurID]', 'un créateurs')
    .option('-f, --events [DebutNomDeLEvent]', 'tous les events')
    .option('-e, --event [eventID]', 'un event')
    .option('-s, --series [DebutNomDeLaSerie]', 'toutes les séries')
    .option('-r, --serie [seriesID]', 'une série')
    .option('-t, --stories ', 'toutes les histoires')
    .option('-u, --storie [storiesID]', 'une histoires')

program.parse(process.argv)

if (program.characters) {
    const variable = `characters?nameStartsWith=${program.characters}&limit=100&`
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
                    test =  'nom : ' + results[i].name + ' , id : ' + results[i].id+ '\n'
                    fs.appendFile('resultat.txt',test,(err) => {
                        if (err) throw err
                    })  
                }
            }else {
                for(let i=0; i<results.length;i++) { 
                    console.log( ' nom : ' + results[i].name + ' , id : ' + results[i].id )
                }
            }})
            
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
    } else if (program.character) {
        const nom = `${program.character}`
        inquirer.prompt([{
            type: 'input',
            message: 'début du nom du personnage',
            name: 'username'
        }]).then(test => {
            console.log(test.username)
            const variable = `characters?nameStartsWith=${test.username}&limit=100&`
            axios.get(lien+variable+code_verif)
                .then(function ({ data:{data:{results}}}) {
                    for(let i=0; i<results.length;i++) {
                    if (results[i].name == nom){
                        id = results[i].id
                        }
                    }
                    if(id==""){
                        id = `${program.character}`
                    }
                    const variable = "characters/"
                    inquirer.prompt([{
                        type:'rawlist',
                        message:'Que voulez vous voir à propos de votre personnage',
                        name:'choix',
                        choices:[
                            'Comics',
                            'Events',
                            'Series',
                            'Stories',
                            'Tout'
                        ]
                    }]).then(answers => {
                        if(answers.choix=='Comics'){
                            axios.get(lien+variable+id+"/comics?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else if (answers.choix=='Events'){
                            axios.get(lien+variable+id+"/events?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else if (answers.choix=='Series'){
                            axios.get(lien+variable+id+"/series?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else if (answers.choix=='Stories'){
                            axios.get(lien+variable+id+"/stories?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else {
                            axios.get(lien+variable+id+"?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                    console.log("\n comics :")
                                    for (let j= 0; j<results[0].comics.items.length;j++){
                                        console.log( results[0].comics.items[j].name)
                                    }
                                    console.log("\n stories :")
                                    for (let j= 0; j<results[0].stories.items.length;j++){
                                        console.log( results[0].stories.items[j].name)
                                    }
                                    console.log(" \n series : ")
                                    for (let j= 0; j<results[0].series.items.length;j++){
                                        console.log( results[0].series.items[j].name)
                                    }
                                    console.log("\n events : ")
                                    for (let j= 0; j<results[0].events.items.length;j++){
                                        console.log( results[0].events.items[j].name)
                                    }
                                }
                            )
                        }
                    });
                    })
                .catch(function (error) {
                    console.log(error);
                })})
            ;
    } else if (program.comics) {
        const variable = `comics?titleStartsWith=${program.comics}&limit=100&`
        axios.get(lien+variable+code_verif)
        .then(function ({ data:{data:{results}}}) {
            for(let i=0; i<results.length;i++) {
                console.log( ' title : ' + results[i].title + ' , id : ' + results[i].id )
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
    } else if (program.comic) {
        const nom = `${program.comics}`
        inquirer.prompt([{
            type: 'input',
            message: 'début du titre du comics',
            name: 'titre'
        }]).then(test => {
            console.log(test.titre)
            const variable = `comics?titleStartsWith=${test.titre}&limit=100&`
            axios.get(lien+variable+code_verif)
                .then(function ({ data:{data:{results}}}) {
                    for(let i=0; i<results.length;i++) {
                    if (results[i].title == nom){
                        id = results[i].id
                        }
                    }
                    if(id==""){
                        id = `${program.comic}`
                    }
                    const variable = "comics/"
                    inquirer.prompt([{
                        type:'rawlist',
                        message:'Que voulez vous voir à propos de votre personnage',
                        name:'choix',
                        choices:[
                            'Characters',
                            'Events',
                            'Stories',
                            'Creators',
                            'Tout'
                        ]
                    }]).then(answers => {
                        if(answers.choix=='Characters'){
                            axios.get(lien+variable+id+"/characters?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].name + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else if (answers.choix=='Events'){
                            axios.get(lien+variable+id+"/events?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else if (answers.choix=='Stories'){
                            axios.get(lien+variable+id+"/stories?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                } 
                            })
                        }
                        else if (answers.choix=='Creators'){
                            axios.get(lien+variable+id+"/creators?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].fullName + ' , id : ' + results[i].id )
                                } 
                            })
                        }
                        else {
                            axios.get(lien+variable+id+"?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                    console.log( results[0].id )
                                    console.log("\n characters :")
                                    for (let j= 0; j<results[0].characters.items.length;j++){
                                        console.log( results[0].characters.items[j].name)
                                    }
                                    console.log("\n stories :")
                                    for (let j= 0; j<results[0].stories.items.length;j++){
                                        console.log( results[0].stories.items[j].name)
                                    }
                                    console.log(" \n creators : ")
                                    for (let j= 0; j<results[0].creators.items.length;j++){
                                        console.log( results[0].creators.items[j].name)
                                    }
                                    console.log("\n events : ")
                                    for (let j= 0; j<results[0].events.items.length;j++){
                                        console.log( results[0].events.items[j].name)
                                    }
                                }
                            )
                        }
                    });
                    })
                .catch(function (error) {
                    console.log(error);
                })})
            ;
    } else if (program.creators) {
        const variable = `creators?nameStartsWith=${program.creators}&limit=100&`
        axios.get(lien+variable+code_verif)
        .then(function ({ data:{data:{results}}}) {
            for(let i=0; i<results.length;i++) {
                console.log( ' title : ' + results[i].fullName + ' , id : ' + results[i].id )
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
    } else if (program.creator) {
        const nom = `${program.creator}`
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
                        id = `${program.creator}`
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
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else if (answers.choix=='Events'){
                            axios.get(lien+variable+id+"/events?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else if (answers.choix=='Stories'){
                            axios.get(lien+variable+id+"/stories?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                } 
                            })
                        }
                        else if (answers.choix=='Comics'){
                            axios.get(lien+variable+id+"/comics?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].fullName + ' , id : ' + results[i].id )
                                } 
                            })
                        }
                        else {
                            axios.get(lien+variable+id+"?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                    console.log( results[0].id )
                                    console.log("\n seires :")
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
                                }
                            )
                        }
                    });
                    })
                .catch(function (error) {
                    console.log(error);
                })})
            ;
    } else if (program.events) {
        const variable = `events?nameStartsWith=${program.events}&limit=100&`
        axios.get(lien+variable+code_verif)
        .then(function ({ data:{data:{results}}}) {
            for(let i=0; i<results.length;i++) {
                console.log( ' title : ' + results[i].title + ' , id : ' + results[i].id )
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
    } else if (program.event) {
        const nom = `${program.event}`
        inquirer.prompt([{
            type: 'input',
            message: 'début du nom de l event',
            name: 'titre'
        }]).then(test => {
            console.log(test.titre)
            const variable = `events?nameStartsWith=${test.titre}&limit=100&`
            axios.get(lien+variable+code_verif)
                .then(function ({ data:{data:{results}}}) {
                    for(let i=0; i<results.length;i++) {
                        if (results[i].title == nom){
                            id = results[i].id
                        }
                    }
                    if(id==""){
                        id = `${program.event}`
                    }
                    const variable = "events/"
                    inquirer.prompt([{
                        type:'rawlist',
                        message:'Que voulez vous voir à propos de votre personnage',
                        name:'choix',
                        choices:[
                            'Characters',
                            'Comics',
                            'Stories',
                            'Creators',
                            'Series',
                            'Tout'
                        ]
                    }]).then(answers => {
                        if(answers.choix=='Characters'){
                            axios.get(lien+variable+id+"/characters?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].name + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else if (answers.choix=='Comics'){
                            axios.get(lien+variable+id+"/comics?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else if (answers.choix=='Series'){
                            axios.get(lien+variable+id+"/series?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else if (answers.choix=='Stories'){
                            axios.get(lien+variable+id+"/stories?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                } 
                            })
                        }
                        else if (answers.choix=='Creators'){
                            axios.get(lien+variable+id+"/creators?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].fullName + ' , id : ' + results[i].id )
                                } 
                            })
                        }
                        else {
                            axios.get(lien+variable+id+"?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                    console.log( results[0].id )
                                    console.log("\n characters :")
                                    for (let j= 0; j<results[0].characters.items.length;j++){
                                        console.log( results[0].characters.items[j].name)
                                    }
                                    console.log("\n stories :")
                                    for (let j= 0; j<results[0].stories.items.length;j++){
                                        console.log( results[0].stories.items[j].name)
                                    }
                                    console.log(" \n creators : ")
                                    for (let j= 0; j<results[0].creators.items.length;j++){
                                        console.log( results[0].creators.items[j].name)
                                    }
                                    console.log("\n comics : ")
                                    for (let j= 0; j<results[0].comics.items.length;j++){
                                        console.log( results[0].comics.items[j].name)
                                    }
                                    console.log("\n series : ")
                                    for (let j= 0; j<results[0].series.items.length;j++){
                                        console.log( results[0].series.items[j].name)
                                    }
                                }
                            )
                        }
                    });
                    })
                .catch(function (error) {
                    console.log(error);
                })})
            ;
    } else if (program.series) {
        const variable = `series?titleStartsWith=${program.series}&limit=100&`
        axios.get(lien+variable+code_verif)
        .then(function ({ data:{data:{results}}}) {
            for(let i=0; i<results.length;i++) {
                console.log( ' title : ' + results[i].title + ' , id : ' + results[i].id )
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
    } else if (program.serie) {
        const nom = `${program.serie}`
        inquirer.prompt([{
            type: 'input',
            message: 'début du nom de la serie',
            name: 'titre'
        }]).then(test => {
            console.log(test.titre)
            const variable = `series?titleStartsWith=${test.titre}&limit=100&`
            axios.get(lien+variable+code_verif)
                .then(function ({ data:{data:{results}}}) {
                    for(let i=0; i<results.length;i++) {
                    if (results[i].title == nom){
                        id = results[i].id
                        }
                    }
                    if(id==""){
                        id = `${program.serie}`
                    }
                    const variable = "series/"
                    inquirer.prompt([{
                        type:'rawlist',
                        message:'Que voulez vous voir à propos de votre personnage',
                        name:'choix',
                        choices:[
                            'Characters',
                            'Comics',
                            'Stories',
                            'Creators',
                            'Events',
                            'Tout'
                        ]
                    }]).then(answers => {
                        if(answers.choix=='Characters'){
                            axios.get(lien+variable+id+"/characters?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].name + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else if (answers.choix=='Comics'){
                            axios.get(lien+variable+id+"/comics?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                }
                            })
                        }
                        else if (answers.choix=='Stories'){
                            axios.get(lien+variable+id+"/stories?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                } 
                            })
                        }
                        else if (answers.choix=='Creators'){
                            axios.get(lien+variable+id+"/creators?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].fullName + ' , id : ' + results[i].id )
                                } 
                            })
                        }
                        else if (answers.choix=='Events'){
                            axios.get(lien+variable+id+"/events?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                for(let i=0; i<results.length;i++) {
                                    console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                                } 
                            })
                        }
                        else {
                            axios.get(lien+variable+id+"?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                    console.log( results[0].id )
                                    console.log("\n characters :")
                                    for (let j= 0; j<results[0].characters.items.length;j++){
                                        console.log( results[0].characters.items[j].name)
                                    }
                                    console.log("\n stories :")
                                    for (let j= 0; j<results[0].stories.items.length;j++){
                                        console.log( results[0].stories.items[j].name)
                                    }
                                    console.log(" \n creators : ")
                                    for (let j= 0; j<results[0].creators.items.length;j++){
                                        console.log( results[0].creators.items[j].name)
                                    }
                                    console.log("\n comics : ")
                                    for (let j= 0; j<results[0].comics.items.length;j++){
                                        console.log( results[0].comics.items[j].name)
                                    }
                                    console.log("\n events : ")
                                    for (let j= 0; j<results[0].events.items.length;j++){
                                        console.log( results[0].events.items[j].name)
                                    }
                                }
                            )
                        }
                    });
                    })
                .catch(function (error) {
                    console.log(error);
                })})
            ;
    } else if (program.stories) {
        const variable = `stories?limit=100&`
        axios.get(lien+variable+code_verif)
        .then(function ({ data:{data:{results}}}) {
            for(let i=0; i<results.length;i++) {
                console.log( ' title : ' + results[i].title + ' , id : ' + results[i].id )
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
    } else if (program.storie) {
        id = `${program.storie}`
        const variable = "stories/"
        inquirer.prompt([{
            type:'rawlist',
            message:'Que voulez vous voir à propos du film',
            name:'choix',
            choices:[
                'Characters',
                'Comics',
                'Series',
                'Creators',
                'Events',
                'Tout'
            ]
        }]).then(answers => {
            if(answers.choix=='Characters'){
                axios.get(lien+variable+id+"/characters?"+code_verif)
                .then(function ({ data:{data:{results}}}) {
                    for(let i=0; i<results.length;i++) {
                        console.log( ' nom : ' + results[i].name + ' , id : ' + results[i].id )
                    }
                })
            }
            else if (answers.choix=='Comics'){
                axios.get(lien+variable+id+"/comics?"+code_verif)
                .then(function ({ data:{data:{results}}}) {
                    for(let i=0; i<results.length;i++) {
                        console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                    }
                })
            }
            else if (answers.choix=='Events'){
                axios.get(lien+variable+id+"/events?"+code_verif)
                .then(function ({ data:{data:{results}}}) {
                    for(let i=0; i<results.length;i++) {
                        console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                    }
                })
            }
            else if (answers.choix=='Stories'){
                axios.get(lien+variable+id+"/stories?"+code_verif)
                .then(function ({ data:{data:{results}}}) {
                    for(let i=0; i<results.length;i++) {
                        console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                    } 
                })
            }
            else if (answers.choix=='Series'){
                axios.get(lien+variable+id+"/series?"+code_verif)
                .then(function ({ data:{data:{results}}}) {
                    for(let i=0; i<results.length;i++) {
                        console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id )
                    } 
                })
            }
            else if (answers.choix=='Creators'){
                axios.get(lien+variable+id+"/creators?"+code_verif)
                .then(function ({ data:{data:{results}}}) {
                    for(let i=0; i<results.length;i++) {
                        console.log( ' nom : ' + results[i].fullName + ' , id : ' + results[i].id )
                    } 
                })
            }
            else {
                axios.get(lien+variable+id+"?"+code_verif)
                .then(function ({ data:{data:{results}}}) {
                        console.log( results[0].id )
                        console.log("\n characters :")
                        for (let j= 0; j<results[0].characters.items.length;j++){
                            console.log( results[0].characters.items[j].name)
                        }
                        console.log("\n series :")
                        for (let j= 0; j<results[0].series.items.length;j++){
                            console.log( results[0].series.items[j].name)
                        }
                        console.log(" \n creators : ")
                        for (let j= 0; j<results[0].creators.items.length;j++){
                            console.log( results[0].creators.items[j].name)
                        }
                        console.log("\n comics : ")
                        for (let j= 0; j<results[0].comics.items.length;j++){
                            console.log( results[0].comics.items[j].name)
                        }
                        console.log("\n events : ")
                        for (let j= 0; j<results[0].events.items.length;j++){
                            console.log( results[0].events.items[j].name)
                        }
                    }
                )
            }
            
        })
        }else {
    program.help()
}

