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
                3,
                3
            ],
            "prev": false,
            "next": false
        },
        {
            "item": [
                3,
                0
            ],
            "prev": false,
            "next": "33"
        },
        {
            "item": [
                0,
                1
            ],
            "prev": false,
            "next": "30"
        },
        {
            "item": [
                1,
                6
            ],
            "prev": false,
            "next": "01"
        },
        {
            "item": [
                6,
                0
            ],
            "prev": false,
            "next": "16"
        },
        {
            "item": [
                0,
                2
            ],
            "prev": false,
            "next": "60"
        },
        {
            "item": [
                2,
                2
            ],
            "prev": false,
            "next": "02"
        },
        {
            "item": [
                2,
                1
            ],
            "prev": false,
            "next": "22"
        },
        {
            "item": [
                1,
                5
            ],
            "prev": false,
            "next": "21"
        },
        {
            "item": [
                5,
                4
            ],
            "prev": false,
            "next": "15"
        },
        {
            "item": [
                4,
                0
            ],
            "prev": false,
            "next": "54"
        },
        {
            "item": [
                6,
                3
            ],
            "prev": "33",
            "next": false
        },
        {
            "item": [
                0,
                0
            ],
            "prev": false,
            "next": "40"
        },
        {
            "item": [
                6,
                6
            ],
            "prev": "63",
            "next": false
        }
    ],
    selected: [],
    index: -1,
    turn: '',
    picker: false,
    boardPos: {},
    diceWidth: null,
    started: false,
    moveable: [6, 0],
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
            let { item, rotate, prev = false, next = false } = data;
            item = rotate > 0 ? item : [item[1], item[0]];
            if (!state.board.find(e => equal(item, e.item))) {
                state.board.push({ item: clone(item), prev, next });
                state.selected = [];
                state.deck['me'] = state.deck['me'].filter(e => !equal(item, e));
                if (!state.moveable.length) {
                    state.moveable = clone(item);
                }
                else {
                    let t = next == 0 ? 0 : 1;
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