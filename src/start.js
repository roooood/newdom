
import { shuffle } from './helper';

export default function dices() {
    let dices = [], i, j, simi = [], deck = [];
    for (i = 0; i < 7; i++) {
        for (let j = 0; j <= i; j++) {
            dices.push([i, j]);
            simi.push(true);
        }
    }
    dices = shuffle(dices);
    let diceLen = dices.length;
    for (i = 0; i < 2; i++) {
        deck[i] = [];
        while (deck[i].length < 7) {
            j = Math.floor(Math.random() * diceLen);
            if (dices[j] != null) {
                deck[i].push(dices[j])
                simi[j] = false;
                dices[j] = null
            }
        }
    }
    return { simi, deck, dices }
}