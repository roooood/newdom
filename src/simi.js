import React, { createRef, useContext, useEffect, useMemo } from 'react';
import { storeContext } from './context';
import { animateContext } from './animate';
import tiles from './tiles';
import { chunk } from './helper';

function Simi() {
    const [{ simi, index }, dispatch] = useContext(storeContext);
    const { from, start } = useContext(animateContext);

    const refs = useMemo(() =>
        Array.from({ length: simi.length }).map(() => createRef())
        , []);

    const anim = (i) => {
        dispatch({ type: 'index', data: i });
    }
    useEffect(() => {
        if (index >= 0) {
            start()
                .then(() => {
                    dispatch({ type: 'deck' });
                })
        }
    }, [index]);

    const list = chunk(simi, 14);
    return (

        <div className={"simi "}>
            {list.map((items, i) =>
                <div className={"simi-row"} key={i}>
                    {items.map((item, j) => {
                        let count = (i * 14) + j;
                        let boll = Boolean(item)
                        return (
                            <div className={"simi-col " + (boll ? '' : 'used')} key={j}  >
                                {boll &&
                                    <img
                                        ref={index == count ? from : null}
                                        onClick={() => anim(count)}
                                        className="abs" src={item === true ? tiles.blank.default : tiles[item.join('-')].default}
                                    />}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>

    )
}


export default Simi;