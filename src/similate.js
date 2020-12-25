import React, { useEffect, useContext, useRef } from 'react';
import Stack from './stack';
import Simi from './simi';
import Board from './board';
import { storeContext } from './context';
import { animateContext } from './animate';

import initialData from './start';
import { getPosition } from './helper';
const { simi, deck, dices } = initialData();

export default (props) => {
    const [{ index, started }, dispatch] = useContext(storeContext);
    const { start } = useContext(animateContext);
    const board = useRef(null);

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
            dispatch({ type: 'all', data: { picker: false, started: true } });
        }
    }

    useEffect(() => {
        const boardPos = getPosition(board.current);
        const diceWidth = Math.min(Math.max(Math.round(boardPos.width / 25), 28), 40);

        dispatch({
            type: 'all',
            data: {
                dices,
                deck: {
                    me: deck[0],
                    opponet: deck[1]
                },
                simi,
                boardPos,
                diceWidth,
                started: true,
            }
        });
        setTimeout(() => {
            // animate();
        }, 500);
    }, []);

    useEffect(() => {
        if (index >= 0) {
            start(400)
                .then(() => {
                    dispatch({ type: 'deck' });
                    if (!started)
                        animate();
                    else
                        dispatch({ type: 'all', data: { picker: false } });

                })
        }
    }, [index]);

    return (
        <div className="box">
            <div className="stack">
                <Stack type="opponet" />
            </div>
            <div className="board" ref={board}>
                <Board />
            </div>
            <div className="stack">
                <Stack type="me" />
            </div>
            <Simi />
        </div>
    )
};
