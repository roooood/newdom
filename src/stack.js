import React, { useEffect, useState, useContext } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';
import { equal, include, clone } from './helper';
import tiles from './tiles';

function Stack({ type }) {
    const [{ started, boardPos, deck, selected, moveable, index, turn, diceWidth: width }, dispatch] = useContext(storeContext);
    const { to, from } = useContext(animateContext);
    const isMe = type == 'me';
    const toBoard = (item) => {
        dispatch({ type: 'temp-board', data: item })
    }
    useEffect(() => {
        if (isMe && moveable.length > 0) {
            setTimeout(() => {
                if (!(include(moveable, deck.me, false))) {
                    dispatch({ type: 'all', data: { picker: true } });
                }
            }, 500);
        }
    }, [deck.me.length]);

    let min = -1;
    let data = clone(deck[type]);
    const temp = (index >= 0 && turn == type);
    const tileWidth = width * (data.length + (temp ? 2 : 1)) + (data.length * 4);
    const maxWidth = boardPos.width / 2 + width;
    const count = Math.floor(maxWidth / width) - 1;
    if (isMe && data.length > count) {
        if (started) {
            min = count - 1;
            data.sort((a, b) => !include(moveable, a));
            data = data.slice(0, count);
        }
        else if (data.length > count) {
            min = 0;
            data = data.slice(data.length - count);
        }
    }
    return (
        <div className={"plate " + type}>
            <div className="profile">
                <div className="image">

                </div>
            </div>
            <div className="tile">
                <div className={"user-hand " + type} style={isMe ? { width: tileWidth, maxWidth } : {}} >

                    {width && data.map((item, i) =>
                        <div className={"hand-tile" + ((i == min && isMe) ? ' min ' : '')} key={item === true ? i : item.join('-')} >
                            {isMe
                                ?
                                <img
                                    ref={equal(selected, item) ? from : null}
                                    className={(equal(selected, item) ? 'selected ' : (include(moveable, item) ? 'can-move' : ''))}
                                    style={{ width }}
                                    onClick={() => include(moveable, item) ? toBoard(item) : null}
                                    src={tiles(item)}
                                />
                                : <img src={tiles()} />
                            }
                        </div>
                    )}
                    {temp &&
                        <div className={"hand-tile none"}  >
                            <img style={isMe ? { width } : {}} ref={to} src={tiles()} />
                        </div>
                    }
                </div>
            </div>
            <div className="point">
                <span>0</span>
                Point
            </div>
        </div>
    )
}

export default Stack;