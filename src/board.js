import React, { createRef, useContext, useEffect, useMemo, useState } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';
import tiles from './tiles';
import { equal } from './helper';

function Board() {
    const { to, start } = useContext(animateContext);
    const [{ board, selected, width: w, height: h }, dispatch] = useContext(storeContext);
    const width = Math.min(Math.round(w / 25), 34);
    const fullWidth = width * 2;
    const halfWidth = width / 2 + 1;
    const [selectedTo, setSelectedTo] = useState(null);
    const [p, setPrev] = useState(0);
    let prev = 0;

    useEffect(() => {
        if (selectedTo != null)
            start();
    }, [selectedTo]);
    useEffect(() => {
        if (board.length > 1)
            setPrev(prev)
    }, [board.length]);

    const renderDice = (item, i) => {
        let same = item[0] == item[1];
        let rotate = same ? 0 : 90;
        let transform = 'translateX(-' + ((same && prev) ? prev - halfWidth + 1 : prev) + 'px) rotate(' + rotate + 'deg)';
        prev += (same ? (prev == 0 ? width + halfWidth : width + 1) : fullWidth);
        // if (equal(item, selected)) {
        //     return (
        //         <div
        //             key={i}
        //             ref={equal(selectedTo, item) ? to : null}
        //             className={"abs selected"}
        //             style={{ transform, width, height: width * 2 - 2 }}
        //             onClick={() => setSelectedTo(item)}
        //         >
        //             <img
        //                 src={tiles(item)}
        //                 onClick={() => setSelectedTo(item)}
        //             />
        //         </div>
        //     )
        // }
        return (
            <img
                onClick={() => alert('item')}
                key={i}
                className={"abs"}
                style={{ transform, width }}
                src={tiles(item)}
            />
        )
    }
    let transform = 'translateX(' + (p / 2.25) + 'px)';
    return (
        <div className={"board-dir"} style={{ transform }}>
            {w && board.map((item, i) => renderDice(item, i))}
        </div>

    )
}


export default Board;