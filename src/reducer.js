import start from './dices';
const { simi, deck, dices } = start();

export const state = { simi, me: [], opponet: [], dices };

export function reducer(state, { type, data }) {
    switch (type) {
        case 'simi':
            let index = data;
            let simi = state.simi;
            let me = state.me;
            simi[index] = false;
            me.push(dices[index])
            return { ...state, simi };
    }
    return state
}
