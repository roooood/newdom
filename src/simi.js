import React, { createRef, useContext, useEffect, useMemo } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';
import tiles from './tiles';

function Simi() {
    const [{ simi, index, picker }, dispatch] = useContext(storeContext);
    const { from } = useContext(animateContext);

    const anim = (i) => {
        dispatch({ type: 'index', data: [i, 'me'] });
    }

    return (
        <div className={"simi " + (picker ? 'active' : '')}>
            <div className={"simi-row"}>
                {simi.map((item, i) => {
                    let boll = Boolean(item);
                    return (
                        <div className={"simi-col " + (boll ? '' : 'used')} key={i}  >
                            {boll &&
                                <img
                                    ref={index == i ? from : null}
                                    onClick={() => anim(i)}
                                    className="abs" src={item === true ? tiles() : tiles(item)}
                                />}
                        </div>
                    )
                })}
            </div>
        </div>

    )
}


export default Simi;