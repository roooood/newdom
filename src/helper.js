


export function equal(a, b) {
    if (!a.length)
        return false;
    if (a[0] == a[1])
        return b[0] == a[0] && b[1] == a[1];
    return a.every(e => b.includes(e))
}
export function include(a, b, isNull = true) {
    if (isNull && a.length == 0)
        return true;
    if (Array.isArray(b[0])) {
        return a.some(e => b.findIndex(d => d.includes(e)) >= 0)
    }
    return a.some(e => b?.includes(e))
}
export function clone(arr) {
    let newObj = (arr instanceof Array) ? [] : {};
    for (let i in arr) {
        if (i == 'clone')
            continue;
        if (arr[i] && typeof arr[i] == "object") {
            newObj[i] = clone(arr[i]);
        }
        else
            newObj[i] = arr[i]
    } return newObj;
};
export function toMoney(amount) {
    if (typeof amount == 'undefined' || amount == 'null')
        return '';
    if (amount.length < 2)
        return amount + '';
    return ("" + amount).replace(/,/g, '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
export function toggle(collection, item) {
    let temp = clone(collection)
    var idx = temp.indexOf(item);
    if (idx !== -1) {
        temp.splice(idx, 1);
    } else {
        temp.push(item);
    }
    return temp;
}

export function chunk(arr, len) {
    var chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}
export const pick = (obj, keys) => {
    const tmp = {};
    for (let i of keys) {
        tmp[i] = obj[i]
    }
    return tmp;
};
export const colorize = (str) => {
    let i = 0, hash = 0, color = '';
    for (i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
    color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return '#' + Array(6 - color.length + 1).join('0') + color;
}
export const shuffle = (arr, level = 1) => {
    var a, b, c;
    for (a = 0; a < level; a++) {
        for (b = arr.length - 1; b > 0; b--) {
            c = Math.floor(Math.random() * (b + 1));
            [arr[b], arr[c]] = [arr[c], arr[b]];
        }
    }
    return arr;
}

export function getPosition(element) {
    const { left, right, width, height } = element.getBoundingClientRect();
    return { left, right, width, height };
}
export function getPositionAtCenter(element) {
    const { top, left, width, height } = element.getBoundingClientRect();
    return {
        x: left + width / 2,
        y: top + height / 2,
        width: Math.round(width),
        height: Math.round(height),
    };
}
export function getDistance(a, b) {
    const aPosition = getPositionAtCenter(a);
    const bPosition = getPositionAtCenter(b);
    let distance = Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
    return {
        distance: distance,
        x: aPosition.x - bPosition.x,
        y: aPosition.y - bPosition.y
    }
}
