import React, { useContext, useEffect, memo, useState } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';
import tiles from './tiles';
import _ from 'lodash';


export default function useDices({ data }) {
    const { to, start } = useContext(animateContext);
    const [{ boardPos, diceWidth: width }, dispatch] = useContext(storeContext);
    const fullWidth = width * 2;
    const halfWidth = width / 2 + 1;
    const [selectedTo, setSelectedTo] = useState(null);
    let allWidth = { up: 0, line: 0, down: 0 };
    let board = { x: 0, y: 0 };
    let pos = {};
    let sign = { prev: 1, next: -1 };
    let last = { prev: null, next: null };
    let horizontalDone = false;
    let scale = 0;
    const renderDice = ({ item, prev = false, next = false, isTemp = false }, i) => {

        let type = prev !== false ? 'prev' : 'next';
        let link = prev !== false ? prev : next;
        let same = item[0] == item[1];
        let rotate = same ? 0 : 90;
        let tempWidth = same ? width : fullWidth;
        let key = item.join('');
        pos[key] = { item, same, x: 1, y: 0, level: 1, vertical: false, end: item[0], done: false, ...(prev ? { prev } : { next }) }
        let tempX = 0;
        let tempY = 0;

        if (i > 0) {
            if (pos[link].done) {
                tempX = sign[type] * (halfWidth + (pos[link].same ? width : fullWidth));
                if (same)
                    tempX = tempX - (sign[type] * halfWidth) + sign[type] * 2;
                sign[type] = -sign[type];
                pos[key].vertical = true;
                rotate = 0;
                if (prev) {
                    rotate = pos[link].end == item[0] ? -180 : 0;
                }
                else {
                    rotate = pos[link].end == item[1] ? 180 : 0;
                }
                tempY = prev
                    ? pos[link].y - (pos[link].same ? fullWidth : width + halfWidth)
                    : pos[link].y + (pos[link].same ? fullWidth : width + halfWidth);

                board.y += tempY;
                // setTranslate(board);
            }
            else if (pos[link].level > 1) {
                tempY = pos[link].vertical
                    ? prev
                        ? pos[link].y - (pos[key].same ? width : halfWidth - 2)
                        : pos[link].y + (pos[key].same ? width : halfWidth - 2)
                    : pos[link].y;
                tempX = pos[link].vertical ? -sign[type] * (halfWidth - 1) : 0;
            }
            pos[key].level = pos[link].level;
            pos[key].y = tempY;
            if (prev) {
                rotate = pos[link].end == item[0] ? -sign[type] * rotate : sign[type] * rotate;
            }
            else {
                rotate = pos[link].end == item[1] ? sign[type] * rotate : -sign[type] * rotate;
            }
            let not = item.filter(e => pos[link].item.indexOf(e) < 0);
            pos[key].end = not.length > 0 ? not[0] : item[0];

            tempX += (pos[link].x + sign[type] * (pos[link].same ? width + halfWidth : fullWidth));
            if (same)
                tempX = tempX - (sign[type] * halfWidth) + sign[type] * 2;
            else if (pos[link].vertical && pos[link].same)
                tempX = tempX + (sign[type] * halfWidth - 1);

            pos[key].x = tempX;

            last[type] = key;
        }
        else {
            tempX += 1;
            last = { next: key, prev: key }
        }

        let level = !horizontalDone ? 'line' : prev ? 'up' : 'down';
        allWidth[level] += tempWidth;
        let done = allWidth[level] + halfWidth > boardPos.width;
        if (done) {
            if (level == 'line') {
                pos[last.prev].done = true;
                pos[last.prev].level++;
                pos[last.next].done = true;
                pos[last.next].level++;
            }
            else {
                pos[key].done = true;
                pos[key].level++;
                allWidth[level] = 0;
            }
            scale = Math.max(scale, allWidth[level] - boardPos.width) + 5;
        }
        let transform = 'translateX(' + tempX + 'px) translateY(' + tempY + 'px) rotate(' + rotate + 'deg)';
        if (!horizontalDone) {
            board.x += (next ? -1 : 1) * (same ? halfWidth : width);
            horizontalDone = done;
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

    const dices = width ? data.map((item, i) => renderDice(item, i)) : null;
    board.y = width ? Math.abs((Math.abs(pos[last.prev].y) - Math.abs(pos[last.next].y)) / 2) : 0;
    board.x -= scale / 2.5;
    scale = scale > 0 ? Math.max(1 - (scale / 180), .85) : 1;
    return { dices, board, scale }
}