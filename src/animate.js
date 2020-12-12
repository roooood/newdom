import React, { createContext, useRef } from "react";
import { getPositionAtCenter, getDistance } from './helper';

export const animateContext = createContext();

export const AnimateContextProvider = props => {
    const from = useRef(null);
    const to = useRef(null);

    const start = (timing = 400) => {
        return new Promise((resolve, reject) => {
            const { x, y } = getDistance(to.current, from.current);
            const { width: fw, height: fh } = getPositionAtCenter(from.current);
            const { width: tw, height: th } = getPositionAtCenter(to.current);
            from.current.style.transform = 'translate(' + (x - ((tw - fw) / 2)) + 'px,' + (y - ((th - fh) / 2)) + 'px)';
            from.current.style.width = tw + 'px';
            setTimeout(() => {
                resolve();
            }, timing);
        })
    }

    return (
        <animateContext.Provider value={{ from, to, start }}>
            {props.children}
        </animateContext.Provider>
    );
};