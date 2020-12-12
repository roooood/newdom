import React, { useEffect, useContext } from 'react';
import Stack from './stack';
import Simi from './simi';
import Board from './board';
import { storeContext } from './context';
import { animateContext } from './animate';

import initialData from './start';
const { simi, deck, dices } = initialData();

export default (props) => {
    const [{ index }, dispatch] = useContext(storeContext);
    const { start } = useContext(animateContext);

    const pick = (me, opponet) => {
        if (me.length >= opponet.length) {
            return ['me', me.pop()]
        }
        else {
            return ['opponet', opponet.pop()]
        }
    }
    const animate = () => {
        const ind = simi.findIndex(e => e === false);
        if (ind >= 0) {
            const [type, val] = pick(deck[0], deck[1]);
            dispatch({ type: 'anim', data: [ind, type, val] });
            simi[ind] = true;
        }
        else {
            dispatch({ type: 'all', data: { picker: false } });

        }
    }

    useEffect(() => {
        dispatch({ type: 'all', data: { dices, picker: true } });
        setTimeout(() => {
            animate();
        }, 500);
    }, []);

    useEffect(() => {
        if (index >= 0) {
            start(400)
                .then(() => {
                    dispatch({ type: 'deck' });
                    animate();
                })
        }
    }, [index]);

    return (
        <div className="box">
            <div className="stack">
                <Stack type="opponet" />
            </div>
            <div className="board">
                <Board />
            </div>
            <div className="stack">
                <Stack type="me" />
            </div>
            <Simi />
        </div>
    )
};
