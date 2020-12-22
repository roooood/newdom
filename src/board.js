import React, { useContext, useState } from 'react';
import { storeContext } from './context';
import Dices from './dices';
import _ from 'lodash';

function Board() {
    const [{ board, selected, moveable }] = useContext(storeContext);
    const [width, setWidth] = useState(0);

    let temp = [...board];
    if (selected.length > 0) {
        if (board.length == 0) {
            temp.push({ item: selected })
        }
        if (selected.includes(moveable[0]) && temp.length > 0) {
            temp.push({ item: selected, prev: (_.findLast(board, e => e.prev) ?? board[0]).item.join('') })
        }
        if (selected.includes(moveable[1])) {
            temp.push({ item: selected, next: (_.findLast(board, e => e.next) ?? board[0]).item.join('') })
        }
    }

    let transform = 'translateX(' + width + 'px)';
    return (
        <div
            className={"board-dir"}
            style={{ transform }}
        >
            <Dices data={temp} setWidth={setWidth} />
        </div>

    )
}



export default Board;