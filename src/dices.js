import React, { useContext, useEffect, memo, useState } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';
import tiles from './tiles';
import { equal } from './helper';

function Dices({ data, setWidth }) {
    const { to, start } = useContext(animateContext);
    const [{ selected, moveable, width: boardWidth }, dispatch] = useContext(storeContext);
    const width = Math.min(Math.max(Math.round(boardWidth / 25), 28), 40);
    const fullWidth = width * 2;
    const halfWidth = width / 2 + 1;
    const [selectedTo, setSelectedTo] = useState(null);
    let allWidth = 0;
    let pos = {};
    const renderDice = ({ item, prev = false, next = false }, i) => {
        let link = prev !== false ? prev : next;
        let same = item[0] == item[1];
        let rotate = same ? 0 : 90;
        if (equal(item, selected)) {
            if (prev) {
                rotate = item[0] == moveable[0] ? -rotate : rotate;
            }
            else {
                rotate = item[1] == moveable[1] ? -rotate : rotate;
            }
        }
        else {
            rotate = item[0] < item[1] ? -rotate : rotate;
        }
        let key = item.join('');
        let tempX = 0;
        pos[key] = { isSame: same, x: 1, y: 0 }
        if (i > 0) {
            if (prev) {
                tempX = (pos[link].x + (pos[link].isSame ? width + halfWidth - 1 : fullWidth));
                tempX -= same ? halfWidth - 2 : 0;
                pos[key].x = tempX;
            }
            else {
                tempX = -(pos[link].x + (pos[link].isSame ? width + halfWidth - 1 : fullWidth));
                tempX += same ? halfWidth - 2 : 0;
                pos[key].x = -tempX;
            }
        }
        let transform = 'translateX(' + tempX + 'px) rotate(' + rotate + 'deg)';
        allWidth += (prev ? -1 : 1) * ((same ? halfWidth : width) + width);
        setWidth((allWidth / 2));
        if (equal(selected, item)) {
            return (
                <div
                    key={i}
                    ref={selectedTo?.index == i ? to : null}
                    className={"abs selected "}
                    style={{ transform, width, height: width * 2 - 2 }}
                    onClick={() => setSelectedTo({ item, rotate, index: i, prev, next })}
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
    useEffect(() => {
        if (selectedTo != null)
            start({ transform: 'rotate(' + selectedTo.rotate + 'deg)', center: false })
                .then(() => {
                    dispatch({ type: 'board', data: selectedTo });
                    setSelectedTo(null);
                })
    }, [selectedTo]);

    return (
        <>
            {boardWidth && data.map((item, i) => renderDice(item, i))}
        </>

    )
}



export default memo(Dices);