import React, { useEffect, useState, useContext } from 'react';
import { storeContext } from './context';
import tiles from './tiles';

function Stack({ type }) {
    const [{ deck }, dispatch] = useContext(storeContext);
    const data = deck[type];
    return (

        <div className={"user-hand " + type}>
            {data.map((item, i) =>
                <div className={"hand-tile"} key={i} >
                    {type == 'me'
                        ? <img style={{ width: 35 }} src={tiles[item.join('-')].default} />
                        : <img src={tiles.blank.default} />
                    }

                </div>
            )}
        </div>

    )
}

export default Stack;
