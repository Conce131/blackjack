import { shuffle } from "underscore"

(() => {
    'use strict'

    let deck = []
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K']

    let playersPoints = []

    //referencias html
    const btnDraw = document.querySelector('#btnDraw'),
        btnStop = document.querySelector('#btnStop'),
        btnNew = document.querySelector('#btnNew')

    const divPLayerCards = document.querySelectorAll('.divCards'),
        scoreHTML = document.querySelectorAll('small')

    const startGame = (numPLayers = 2) => {
        deck = createDeck()
        playersPoints = []
        for (let i = 0; i < numPLayers; i++) {
            playersPoints.push(0)
        }

        scoreHTML.forEach(e => e.innerHTML = 0)
        divPLayerCards.forEach(e => e.innerHTML = '')

        btnDraw.disabled = false
        btnStop.disabled = false
    }
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
        return shuffle(deck)
    }

    // Esta funcion me permite pedir una carta

    const drawCard = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck'
        }
        return deck.pop()
    }

    const cardValue = (card) => {
        const value = card.match(/[2-9]|10|A|J|Q|K/)
        //otra manera card.substring(0, card.length -1)
        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            :
            value * 1
    }


    //turno 0 = primer jugador y el ultimo la computadora
    const acumulatePoints = (card, turn) => {
        playersPoints[turn] = playersPoints[turn] + cardValue(card)
        scoreHTML[turn].innerText = playersPoints[turn]
        return playersPoints[turn]
    }

    const createCard = (card, turn) => {
        const cardImg = document.createElement('img')
        cardImg.src = `assets/cartas/${card}.png`
        cardImg.classList.add('carta')
        divPLayerCards[turn].append(cardImg)
    }

    const whoWins = () => {

        const [minPoints, pcPoints] = playersPoints

        setTimeout(() => {
            if (pcPoints === minPoints) {
                alert('Nadie gana :( ')
            } else if (minPoints > 21) {
                btnStop.disabled = true
                alert('Computadora gana')
            } else if (pcPoints > 21) {
                btnStop.disabled = true
                btnDraw.disabled = true
                alert('Jugador Gana')
            } else {
                ('Computadora Gana')
                btnDraw.disabled = true
                btnStop.disabled = true
            }
        }, 40);
    }

    const pcTurn = (minPoints) => {
        let pcPoints = 0
        do {
            const card = drawCard()
            pcPoints = acumulatePoints(card, playersPoints.length - 1)
            createCard(card, playersPoints.length - 1)
            if (minPoints > 21) {
                break
            }

        } while (pcPoints < minPoints && minPoints <= 21);

        whoWins()
    }

    //Eventos 
    btnDraw.addEventListener('click', () => {
        const card = drawCard()
        let playerPoints = 0
        playerPoints = acumulatePoints(card, 0)

        createCard(card, 0)

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
        pcTurn(playersPoints[0])
    })


    btnNew.addEventListener('click', () => {
        startGame()
    })

    return {
        newGame: startGame()
    }

})()