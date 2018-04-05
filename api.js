#!/usr/bin/node
const program = require('commander')
const lien = 'https://gateway.marvel.com/v1/public/'
const code_verif = 'ts=1&apikey=1dfbefadf2a95439362a3c18bc9ef646&hash=fdc146bf317b6191b2bb9cbd6f27d2b1'

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
    const variable = 'characters'
    } else if (program.character) {
        const variable = `characters/${program.character}`
    } else if (program.comics) {
        const variable = 'comics'
    } else if (program.comic) {
        const variable = `comics/${program.comic}`
    } else if (program.creators) {
        const variable = 'creators'
    } else if (program.creator) {
        const variable = `creators/${program.creator}`
    } else if (program.events) {
        const variable = 'events'
    } else if (program.event) {
        const variable = `events/${program.event}`
    } else if (program.series) {
        const variable = 'series'
    } else if (program.serie) {
        const variable = `series/${program.serie}`
    } else if (program.stories) {
        const variable = 'stories'
    } else if (program.storie) {
        const variable = `stories/${program.storie}`
    }else {
    program.help()
}