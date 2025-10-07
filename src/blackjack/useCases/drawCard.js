/**
 * 
 * @param {Array<string>} deck deck es un arreglo de string
 * @returns {String} devuelve la carta del deck
 */
export const drawCard = (deck) => {

    if (!deck || deck.length === 0) throw new Error('Se necesita un deck para robar carta')

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}
