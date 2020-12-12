import React, { createRef, useContext, useEffect, useMemo } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';
import tiles from './tiles';

const width = 34;
const fullWidth = width * 2;
const halfWidth = width / 2;

function Board() {
    const [{ board }, dispatch] = useContext(storeContext);
    const { from } = useContext(animateContext);
    let prev = 0;

    const renderDice = (item, i) => {
        let equal = item[0] == item[1];
        let rotate = equal ? 0 : 90;
        // prev -= equal ? halfWidth : 0;

        let transform = 'translateX(-' + prev + 'px) rotate(' + rotate + 'deg)';
        prev += (equal ? (prev == 0 ? width + halfWidth + 1 : width) : fullWidth);
        return (
            <img
                key={i}
                className="abs"
                style={{ transform }}
                src={tiles[item.join('-')].default}
            />
        )
    }
    return (
        <div className={"board-dir"}>
            {board.map((item, i) => renderDice(item, i))}
        </div>

    )
}


export default Board;