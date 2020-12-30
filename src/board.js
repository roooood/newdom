import React, { useContext, useState } from 'react';
import { storeContext } from './context';
import useDices from './dices';
import _ from 'lodash';

function Board() {
    const [{ board, selected, moveable }] = useContext(storeContext);
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
    const { dices, board: translate, scale } = useDices({ data: temp })
    let transform = 'translateX(' + -translate.x + 'px) translateY(' + -translate.y + 'px) scale(' + scale + ')';
    return (
        <div
            className={"board-dir"}
            style={{ transform }}
        >
            {dices}
        </div>

    )
}



export default Board;