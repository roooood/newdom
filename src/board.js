import React, { useContext, useState } from 'react';
import { storeContext } from './context';
import Dices from './dices';
import _ from 'lodash';

function Board() {
    const [{ board, selected, moveable }] = useContext(storeContext);
    const [width, setWidth] = useState(0);
    const [scale, setScale] = useState(1);

    let temp = [...board];
    if (selected.length > 0) {
        if (board.length == 0) {
            temp.push({ item: selected, isTemp: true })
        }
        if (selected.includes(moveable[0]) && temp.length > 0) {
            temp.push({ item: selected, isTemp: true, prev: (_.findLast(board, e => e.prev) ?? board[0]).item.join('') })
        }
        if (selected.includes(moveable[1])) {
            temp.push({ item: selected, isTemp: true, next: (_.findLast(board, e => e.next) ?? board[0]).item.join('') })
        }
    }
    let transform = 'translateX(' + width + 'px) scale(' + scale + ')';
    return (
        <div
            className={"board-dir"}
            style={{ transform }}
        >
            <Dices data={temp} setWidth={setWidth} setScale={setScale} />
        </div>

    )
}



export default Board;