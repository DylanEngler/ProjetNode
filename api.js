#!/usr/bin/node
const program = require('commander')
const axios = require('axios')
const inquirer = require('inquirer')
const lien = 'https://gateway.marvel.com/v1/public/'
const code_verif = 'ts=1&apikey=1dfbefadf2a95439362a3c18bc9ef646&hash=fdc146bf317b6191b2bb9cbd6f27d2b1'
const rl = require('readline').createInterface({
	input: process.stdin, output: process.stdout
})
var id = ""

program
    .version('1.0.0', '-v, --version')
    .option('-c, --characters [DebutDuNomDuPersonnage]', 'Tous les personnages')
    .option('-x, --character [personnageID]', 'un personnage')
    .option('-o, --comics [DebutDuNomDuComics]', 'Tous les comics')
    .option('-m, --comic [comicID]', 'un comic')
    .option('-a, --creators', 'Tous les créateurs')
    .option('-b, --creator [createurID]', 'un créateurs')
    .option('-f, --events', 'tous les events')
    .option('-e, --event [eventID]', 'un event')
    .option('-s, --series', 'toutes les séries')
    .option('-r, --serie [seriesID]', 'une série')
    .option('-t, --stories', 'toutes les histoires')
    .option('-u, --storie [storiesID]', 'une histoires')

program.parse(process.argv)

if (program.characters) {
    const variable = `characters?nameStartsWith=${program.characters}&limit=100&`
    axios.get(lien+variable+code_verif)
        .then(function ({ data:{data:{results}}}) {
            for(let i=0; i<results.length;i++) {
                console.log( ' nom : ' + results[i].name + ' , id : ' + results[i].id )
            }
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
                            'Storie',
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
                                console.log( ' nom : ' + results[i].title + ' , id : ' + results[i].id ) 
                            })
                        }
                        else {
                            axios.get(lien+variable+id+"?"+code_verif)
                            .then(function ({ data:{data:{results}}}) {
                                    console.log( results[0].id )
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
            const variable = `characters?nameStartsWith=${test.titre}&limit=100&`
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
        const variable = 'creators?'
        axios.get(lien+variable+code_verif)
        .then(function ({ data:{data:{results}}}) {
            for(let i=0; i<results.length;i++) {
                retour.creators = retour.creators+ ' titre : '+results[i].firstName+' , id : ' +results[i].id
            }
            console.log(retour)
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
    } else if (program.creator) {
        const variable = `creators/${program.creator}?`
    } else if (program.events) {
        const variable = 'events?'
        axios.get(lien+variable+code_verif)
        .then(function ({ data:{data:{results}}}) {
            for(let i=0; i<results.length;i++) {
                retour.events = retour.events+ ' titre : '+results[i].title+' , id : ' +results[i].id
            }
            console.log(retour)
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
    } else if (program.event) {
        const variable = `events/${program.event}?`
    } else if (program.series) {
        const variable = 'series?'
        axios.get(lien+variable+code_verif)
        .then(function ({ data:{data:{results}}}) {
            for(let i=0; i<results.length;i++) {
                retour.series = retour.series+ ' titre : '+results[i].title+' , id : ' +results[i].id
            }
            console.log(retour)
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
    } else if (program.serie) {
        const variable = `series/${program.serie}?`
    } else if (program.stories) {
        const variable = 'stories?'
        axios.get(lien+variable+code_verif)
        .then(function ({ data:{data:{results}}}) {
            for(let i=0; i<results.length;i++) {
                retour.stories = retour.stories+ ' titre : '+results[i].title+' , id : ' +results[i].id
            }
            console.log(retour)
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
    } else if (program.storie) {
        const variable = `stories/${program.storie}?`
    }else {
    program.help()
}