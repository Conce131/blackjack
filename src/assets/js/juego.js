import { shuffle } from "underscore"

let deck = []
const types = ['C', 'D', 'H', 'S']
const specials = ['A', 'J', 'Q', 'K']

const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let type of types) {
            deck.push(i + type)
        }
    }
    for (let tipo of types) {
        for (let spe of specials) {
            deck.push(spe + tipo)
        }
    }
    console.log('deck', deck)
    deck = shuffle(deck)
    console.log(deck);
    return deck
}

// Esta funcion me permite pedir una carta

const drawCard = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck'
    }

    let card = deck.pop()
    return card
}

const cardValue = (card) => {
    const value = card.match(/[2-9]|10|A|J|Q|K/)
    //otra manera card.substring(0, card.length -1)
    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10
        :
        value * 1
}

createDeck()


const value = cardValue(drawCard())
console.log({ value })

