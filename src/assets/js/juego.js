import { shuffle } from "underscore"

let deck = []
const types = ['C', 'D', 'H', 'S']
const specials = ['A', 'J', 'Q', 'K']

let playerPoints = 0,
    pcPoints = 0

//referencias html
const btnDraw = document.querySelector('#btnDraw')
const btnStop = document.querySelector('#btnStop')
const divPlayerCards = document.querySelector('#playerCards')
const divPcCards = document.querySelector('#pcCards')
const scoreHTML = document.querySelectorAll('small')

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

//turno del pc
const pcTurn = (minPoints) => {
    do {
        const card = drawCard()

        pcPoints = pcPoints + cardValue(card)
        scoreHTML[1].innerText = pcPoints
        // <img class="carta" src="assets/cartas/red_back.png" alt="" />
        const cardImg = document.createElement('img')
        cardImg.src = `assets/cartas/${card}.png`
        cardImg.classList.add('carta')
        divPcCards.append(cardImg)
        if (minPoints > 21) {
            break
        }

    } while (pcPoints < minPoints && minPoints <= 21);

    setTimeout(() => {
        if (pcPoints === minPoints) {
            alert('Nadie gana :( ')
        } else if (minPoints > 21) {
            alert('Computadora gana')
        } else if (pcPoints > 21) {
            alert('Jugador Gana')
        } else {
            ('Computadora Gana')
        }
    }, 20);

}

//Eventos 
btnDraw.addEventListener('click', () => {
    const card = drawCard()

    playerPoints = playerPoints + cardValue(card)
    scoreHTML[0].innerText = playerPoints
    // <img class="carta" src="assets/cartas/red_back.png" alt="" />
    const cardImg = document.createElement('img')
    cardImg.src = `assets/cartas/${card}.png`
    cardImg.classList.add('carta')
    divPlayerCards.append(cardImg)

    if (playerPoints > 21) {
        console.warn('Lo siento mucho, perdiste');
        btnDraw.disabled = true
        pcTurn(playerPoints)
    } else if (playerPoints === 21) {
        console.warn('21, genial!');
        pcTurn(playerPoints)
    }
})

btnStop.addEventListener('click', () => {
    btnDraw.disabled = true
    btnStop.disabled = true
    pcTurn(playerPoints)

})



