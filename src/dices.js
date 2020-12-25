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
    let horizontalDone = false;
    const renderDice = ({ item, prev = false, next = false, isTemp = false }, i) => {
        let type = prev !== false ? 'prev' : 'next';
        let link = prev !== false ? prev : next;
        let same = item[0] == item[1];
        let rotate = same ? 0 : 90;
        let tempWidth = same ? width : fullWidth;
        let key = item.join('');
        pos[key] = { item, same, x: 1, y: 0, level: 1, vertical: false }
        let tempX = 0;
        let tempY = 0;

        if (horizontalDone) {
            if (pos[link].level == 1) {
                tempX = sign[type] * (halfWidth + (pos[link].same ? width : fullWidth));
                if (same)
                    tempX = tempX - (sign[type] * halfWidth) + sign[type] * 2;
                sign[type] = -sign[type];
                pos[key].vertical = true;
                rotate = 0;
                if (prev) {
                    rotate = item[1] == pos[link].item[1] ? 0 : 180;
                }
                else {
                    rotate = item[1] == pos[link].item[1] ? 180 : 0;
                }
                tempY = pos[link].y + (sign[type] * (pos[link].same ? fullWidth : width + halfWidth));
            }
            else {
                tempY = pos[link].vertical
                    ? pos[link].y + (sign[type] * (pos[key].same ? width : halfWidth - 2))
                    : pos[link].y;
                tempX = pos[link].vertical ? -sign[type] * (halfWidth - 1) : 0;
            }
            pos[key].level = 2;
            pos[key].y = tempY;
        }
        if (isTemp) {
            if (prev) {
                rotate = item[0] == moveable[0] ? -sign[type] * rotate : sign[type] * rotate;
            }
            else {
                rotate = item[1] == moveable[1] ? sign[type] * rotate : -sign[type] * rotate;
            }
        }
        else if (rotate == 90) {
            rotate = item[0] < item[1] ? -rotate : rotate;
        }

        if (i > 0) {
            tempX += (pos[link].x + sign[type] * (pos[link].same ? width + halfWidth : fullWidth));
            if (same)
                tempX = tempX - (sign[type] * halfWidth) + sign[type] * 2;
            else if (pos[link].vertical && pos[link].same)
                tempX = tempX + (sign[type] * halfWidth);

            pos[key].x = tempX;
        }
        else {
            tempX += 1;
        }
        let transform = 'translateX(' + tempX + 'px) translateY(' + tempY + 'px) rotate(' + rotate + 'deg)';
        if (!horizontalDone) {
            boardX += (next ? -1 : 1) * (same ? halfWidth : width);
            setWidth(-(boardX));
            allWidth += tempWidth;
            horizontalDone = allWidth + tempWidth + halfWidth > boardPos.width
        }
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