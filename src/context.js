import React, { useReducer, createContext } from "react";
import start from './start';

export const storeContext = createContext();

const { simi, deck, dices } = start();

const initialState = { simi, deck: { me: [], opponet: [] }, dices, index: -1, turn: '' };

const reducer = (state, { type, data }) => {
    switch (type) {
        case 'index':
            state.index = data;
            state.turn = state.index % 2 == 0 ? 'opponet' : 'me';
            state.simi[state.index] = state.turn == 'me' ? state.dices[state.index] : true;
            return { ...state };
        case 'deck':
            if (state.dices[state.index] != null) {
                state.deck[state.turn].push(state.dices[state.index]);
                state.dices[state.index] = null;
            }
            state.simi[state.index] = false;
            state.index = -1;
            return { ...state };
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