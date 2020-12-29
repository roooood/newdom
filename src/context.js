import React, { useReducer, createContext } from "react";
import { equal, include, clone } from './helper';

export const storeContext = createContext();

const simi = Array.from({ length: 28 }, () => true);
const initialState = {
    simi,
    deck: {
        me: [],
        opponet: []
    },
    dices: [],
    board: [
        {
            "item": [
                0,
                0
            ],
            "prev": false,
            "next": false
        },
        {
            "item": [
                3,
                0
            ],
            "prev": "00",
            "next": false
        },
        {
            "item": [
                6,
                3
            ],
            "prev": "30",
            "next": false
        },
        {
            "item": [
                6,
                5
            ],
            "prev": "63",
            "next": false
        },
        {
            "item": [
                5,
                3
            ],
            "prev": "65",
            "next": false
        },
        {
            "item": [
                3,
                2
            ],
            "prev": "53",
            "next": false
        },
        {
            "item": [
                6,
                0
            ],
            "prev": false,
            "next": "00"
        },
        {
            "item": [
                2,
                0
            ],
            "prev": "32",
            "next": false
        },
        {
            "item": [
                6,
                6
            ],
            "prev": false,
            "next": "60"
        },
        {
            "item": [
                6,
                2
            ],
            "prev": false,
            "next": "66"
        },
        {
            "item": [
                5,
                2
            ],
            "prev": false,
            "next": "62"
        },
        {
            "item": [
                5,
                5
            ],
            "prev": false,
            "next": "52"
        },
        {
            "item": [
                5,
                4
            ],
            "prev": false,
            "next": "55"
        },
        {
            "item": [
                4,
                3
            ],
            "prev": false,
            "next": "54"
        },
        {
            "item": [
                3,
                1
            ],
            "prev": false,
            "next": "43"
        },
        {
            "item": [
                1,
                1
            ],
            "prev": false,
            "next": "31"
        }
    ],
    selected: [],
    index: -1,
    turn: '',
    picker: false,
    boardPos: {},
    diceWidth: null,
    started: false,
    moveable: [0, 1],
};

const reducer = (state, { type, data }) => {
    switch (type) {
        case 'all': {
            return { ...state, ...data };
        }
        case 'temp-board': {
            state.selected = data;
            return { ...state };
        }
        case 'board': {
            let { item, prev = false, next = false } = data;
            if (!state.board.find(e => equal(item, e.item))) {
                state.board.push({ item: clone(item), prev, next });
                state.selected = [];
                state.deck['me'] = state.deck['me'].filter(e => !equal(item, e));
                if (!state.moveable.length) {
                    state.moveable = clone(item);
                }
                else {
                    let t = next === false ? 0 : 1;
                    state.moveable[t] = item[0] == item[1] ? item[0] : item.find(e => e != state.moveable[t]);
                }
            }
            return { ...state };
        }
        case 'anim': {
            let [index, turn, val] = data;
            state.index = index;
            state.turn = turn;
            state.simi[index] = turn == 'me' ? val : true;
            return { ...state };
        }
        case 'index': {
            let [index, turn] = data;
            if (state.dices[index] != null) {
                state.index = index;
                state.turn = turn;
                state.simi[index] = turn == 'me' ? state.dices[index] : true;
                state.dices[index] = null;
            }
            return { ...state };
        }
        case 'deck': {
            let tmp = state.simi[state.index];
            if (tmp) {
                state.deck[state.turn].push(tmp);
                state.simi[state.index] = false;
                state.index = -1;
            }
            return { ...state };
        }
    }
    return state
};

export const StoreContextProvider = props => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <storeContext.Provider value={[state, dispatch]}>
            {props.children}
        </storeContext.Provider>
    );
};