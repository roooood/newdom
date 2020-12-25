import React, { useContext, useEffect, memo, useState } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';
import tiles from './tiles';

function Dices({ data, setWidth }) {
    const { to, start } = useContext(animateContext);
    const [{ boardPos, moveable, diceWidth: width }, dispatch] = useContext(storeContext);
    const fullWidth = width * 2;
    const halfWidth = width / 2 + 1;
    const [selectedTo, setSelectedTo] = useState(null);
    let allWidth = 0;
    let boardX = 0;
    let pos = {};
    let sign = { prev: 1, next: -1 };
    const renderDice = ({ item, prev = false, next = false, isTemp = false }, i) => {
        let type = prev !== false ? 'prev' : 'next';
        let link = prev !== false ? prev : next;
        let same = item[0] == item[1];
        let rotate = same ? 0 : 90;
        let tempWidth = same ? width : fullWidth;
        let key = item.join('');
        pos[key] = { isSame: same, x: 1, y: 0 }
        let tempX = 0;
        let tempY = 0;
        if (allWidth + tempWidth > boardPos.width) {
            tempY = width + halfWidth;
            sign[type] = -sign[type];
        }
        if (isTemp) {
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
        if (i > 0) {
            tempX = (pos[link].x + sign[type] * (pos[link].isSame ? width + halfWidth - 1 : fullWidth));
            if (same)
                tempX = tempX - sign[type] * halfWidth;
            pos[key].x = tempX;
        }
        let transform = 'translateX(' + tempX + 'px) translateY(' + tempY + 'px) rotate(' + rotate + 'deg)';
        boardX += (next ? -1 : 1) * (same ? halfWidth : width);
        if (!tempY)
            setWidth(-(boardX));
        allWidth += tempWidth;
        if (isTemp) {
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
                key={key}
                className={"abs dice-" + key}
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
            {width && data.map((item, i) => renderDice(item, i))}
        </>

    )
}



export default memo(Dices);