#!/usr/bin/node
const program = require('commander')
const axios = require('axios')
const inquirer = require('inquirer')
const lien = 'https://gateway.marvel.com/v1/public/'
const code_verif = 'ts=1&apikey=1dfbefadf2a95439362a3c18bc9ef646&hash=fdc146bf317b6191b2bb9cbd6f27d2b1'
const rl = require('readline').createInterface({
	input: process.stdin, output: process.stdout
})
const retour = {}

program
    .version('1.0.0', '-v, --version')
    .option('-c, --characters', 'Tous les personnages')
    .option('-x, --character [personnageID]', 'un personnage')
    .option('-o, --comics', 'Tous les comics')
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
    const variable = 'characters?'
    axios.get(lien+variable+code_verif)
        .then(function ({ data:{data:{results}}}) {
            console.log(results)
            for(let i=0; i<results.length;i++) {
                retour.personnage = retour.personnage+ ' nom : '+results[i].name+' , id : ' +results[i].id
            }
            console.log(retour)
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
    } else if (program.character) {
        const variable = `characters/${program.character}`
        rl.question('Voulez un élément précis:\n 1- comics \n 2- créateur \n 3-evenement \n 4-séries \n 5-histoire \n 0-aucun', (answer) => {
            answer_int = parseInt(answer)
            if(/^\d{1,3}$/.test(answer_int)){	
                if (answer_int === 0 ) 
                {
                    
                }
                else if (answer_int ===1 )
                {
                    
                }
                else if (answer_int === 2 )
                {
                    console.log("")
                }
            }
        })
    } else if (program.comics) {
        const variable = 'comics?'
        axios.get(lien+variable+code_verif)
        .then(function ({ data:{data:{results}}}) {
            for(let i=0; i<results.length;i++) {
                retour.comics = retour.comics+ ' titre : '+results[i].title+' , id : ' +results[i].id
            }
            console.log(retour)
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
    } else if (program.comic) {
        const variable = `comics/${program.comic}?`
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