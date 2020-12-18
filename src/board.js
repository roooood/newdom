import React, { createRef, useContext, useEffect, useMemo, useState } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';
import tiles from './tiles';
import { equal } from './helper';

function Board() {
    const { to, start } = useContext(animateContext);
    const [{ started, board, selected, moveable, width: w, height: h }, dispatch] = useContext(storeContext);
    const width = Math.min(Math.round(w / 25), 34);
    const fullWidth = width * 2;
    const halfWidth = width / 2 + 1;
    const [selectedTo, setSelectedTo] = useState(null);
    const [p, setPrev] = useState(0);
    let prev = 0;
    let temp = [...board];
    if (selected.length > 0) {
        if (board.length == 0) {
            temp.push(selected)
        }
        if (selected.includes(moveable[0])) {
            temp = [selected, ...temp]
        }
        if (selected.includes(moveable[1])) {
            temp = [...temp, selected]
        }
    }
    useEffect(() => {
        if (selectedTo != null)
            start({ transform: 'rotate(' + selectedTo.rotate + 'deg)', center: false })
                .then(() => {
                    dispatch({ type: 'board', data: selectedTo });
                    setSelectedTo(null);
                })
    }, [selectedTo]);

    useEffect(() => {
        if (temp.length > 1)
            setPrev(prev)
    }, [temp.length]);

    const renderDice = (item, i) => {
        let same = item[0] == item[1];
        let rotate = same ? 0 : 90;
        if (equal(item, selected)) {
            if (i == 0) {
                rotate = item[0] == moveable[0] ? -rotate : rotate;
            }
            else {
                rotate = item[1] == moveable[1] ? -rotate : rotate;
            }
        }
        else {
            rotate = item[0] < item[1] ? -rotate : rotate;
        }
        let transform = 'translateX(' + -((same && prev) ? prev - halfWidth + 1 : prev) + 'px) rotate(' + rotate + 'deg)';
        prev += (same ? (prev == 0 ? width + halfWidth : width + 1) : fullWidth);
        if (equal(selected, item)) {
            return (
                <div
                    key={i}
                    ref={selectedTo?.index == i ? to : null}
                    className={"abs selected "}
                    style={{ transform, width, height: width * 2 - 2 }}
                    onClick={() => setSelectedTo({ item, rotate, index: i })}
                >
                    <img src={tiles(item)} />
                </div>
            )
        }
        return (
            <img
                key={item.join('-')}
                className={"abs"}
                style={{ transform, width }}
                src={tiles(item)}
            />
        )
    }
    let transform = 'translateX(' + (temp.length * width / 2) + 'px)';
    return (
        <div
            className={"board-dir"}
            style={{ transform }}
        >
            {w && temp.map((item, i) => renderDice(item, i))}
        </div>

    )
}


export default Board;