import React, { createContext, useRef } from "react";
import { getPositionAtCenter, getDistance } from './helper';

export const animateContext = createContext();

export const AnimateContextProvider = props => {
    const from = useRef(null);
    const to = useRef(null);

    const start = ({ transform = '', timing = 400, center = true }) => {
        return new Promise((resolve, reject) => {
            const { x, y } = getDistance(to.current, from.current);
            const { width: fw, height: fh } = getPositionAtCenter(from.current);
            const { width: tw, height: th } = getPositionAtCenter(to.current);
            let translateX = center ? ((tw - fw) / 2) : 0;
            let translateY = center ? ((th - fh) / 2) : 0;
            from.current.style.transform = 'translate(' + (x - translateX) + 'px,' + (y - translateY) + 'px) ' + transform;
            from.current.style.width = (tw > th ? th : tw) + 'px';
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