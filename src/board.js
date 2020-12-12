import React, { createRef, useContext, useEffect, useMemo } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';
import tiles from './tiles';

function Board() {
    const [{ board }, dispatch] = useContext(storeContext);
    const { from } = useContext(animateContext);

    return (
        <div className={"board-dir"}>
            {board.map((item, i) => {
                return (
                    <img
                        className="abs" src={tiles[item.join('-')].default}
                    />
                )
            })}
        </div>

    )
}


export default Board;