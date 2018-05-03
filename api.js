#!/usr/bin/node
const program = require('commander')
const axios = require('axios')
const inquirer = require('inquirer')
const os = require("os");
const fs = require('fs')
const character = require('./character')
const characters = require('./characters')
const comic = require('./comic')
const comics = require('./comics')
const serie = require('./serie')
const series = require('./series')
const creator = require('./creator')
const creators = require('./creators')
const eventt= require('./event')
const events = require('./events')
const storie= require('./storie')
const stories = require('./stories')
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
    characters(program.characters)
    } else if (program.character) {
        character(program.character)
    } else if (program.comics) {
       comic(program.comics)
    } else if (program.comic) {
        comics(program.comic)
    } else if (program.creators) {
        creators(program.creators)
    } else if (program.creator) {
        creator(program.creator)
    } else if (program.events) {
        events(program.events)
    } else if (program.event) {
        eventt(program.event)
    } else if (program.series) {
        series(program.series)
    } else if (program.serie) {
        serie(program.serie)   
    } else if (program.stories) {
        stories()
    } else if (program.storie) {
        storie(program.storie)
    }else {
    program.help()
}


