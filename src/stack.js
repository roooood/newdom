import React, { useEffect, useState, useContext } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';
import { equal, include } from './helper';
import tiles from './tiles';

function Stack({ type }) {
    const [{ deck, selected, moveable, index, turn, diceWidth: width }, dispatch] = useContext(storeContext);
    const { to, from } = useContext(animateContext);
    const toBoard = (item) => {
        dispatch({ type: 'temp-board', data: item })
    }
    useEffect(() => {
        if (type == 'me' && moveable.length > 0) {
            setTimeout(() => {
                if (!(include(moveable, deck.me, false))) {
                    dispatch({ type: 'all', data: { picker: true } });
                }
            }, 500);
        }
    }, [deck.me.length]);

    const data = deck[type];
    const temp = (index >= 0 && turn == type);
    const tileWidth = width * (data.length + (temp ? 2 : 1)) + (data.length * 4);
    return (
        <div className={"plate " + type}>
            <div className="profile">
                <div className="image">

                </div>
            </div>
            <div className="tile">
                <div className={"user-hand " + type} style={type == 'me' ? { width: tileWidth } : {}} >
                    {width && data.map((item, i) =>
                        <div className={"hand-tile"} key={item === true ? i : item.join('-')} >
                            {type == 'me'
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
                            <img style={{ width }} ref={to} src={tiles()} />
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