let deck = []
const types = ['C', 'D', 'H', 'S']
const specials = ['A', 'J', 'Q', 'K']

const createDeck = () => {
    for (i = 2; i <= 10; i++) {
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
}

createDeck()