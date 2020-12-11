import React, { useEffect, useState, useContext } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';

import tiles from './tiles';

function Plate({ type }) {
    const [{ deck, index, turn }, dispatch] = useContext(storeContext);
    const { to } = useContext(animateContext);

    const data = deck[type];
    return (
        <div className={"plate " + type}>
            <div className="profile">
                <div className="image">

                </div>
            </div>
            <div className="tile">
                <div className={"user-hand " + type}>
                    {data.map((item, i) =>
                        <div className={"hand-tile"} key={i} >
                            {type == 'me'
                                ? <img src={tiles[item.join('-')].default} />
                                : <img src={tiles.blank.default} />
                            }
                        </div>
                    )}
                    {(index >= 0 && turn == type) &&
                        <div className={"hand-tile none"}  >
                            <img ref={to} src={tiles.blank.default} />
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

export default Plate;