import _ from 'underscore'


/**
 *  Esta funcion crea un nuevo deck
 * @param {Array<string>} tipos 
 * @param {Array} especiales 
 * @returns {Array} devuelve un nuevo deck de cartas
 */

export const createDeck = (tipos, especiales) => {

    if (!tipos || tipos.length === 0)
        throw new Error('Tipos es obligatorio')

    if (!especiales || especiales.length === 0)
        throw new Error('Especiales es obligatorio')

    let deck = []

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    // console.log( deck );
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

