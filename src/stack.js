import React, { useEffect, useState, useContext } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';
import { equal, include } from './helper';
import tiles from './tiles';

function Stack({ type }) {
    const [{ deck, selected, moveable, index, turn, width: w }, dispatch] = useContext(storeContext);
    const width = type == 'me' ? Math.min(Math.round(w / 25), 34) : 22;
    const { to, from } = useContext(animateContext);
    const toBoard = (item) => {
        dispatch({ type: 'temp-board', data: item })
    }
    const data = deck[type];
    const temp = (index >= 0 && turn == type);
    return (
        <div className={"plate " + type}>
            <div className="profile">
                <div className="image">

                </div>
            </div>
            <div className="tile">
                <div className={"user-hand " + type} style={{ width: (width * (data.length + (temp ? 2 : 1))) + (data.length * (type == 'me' ? 4 : -8)) }} >
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
                                : <img style={{ width }} src={tiles()} />
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