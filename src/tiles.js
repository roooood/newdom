
const tiles = {
    '0-0': require('./img/0-0.png'),
    '1-0': require('./img/1-0.png'),
    '1-1': require('./img/1-1.png'),
    '2-0': require('./img/2-0.png'),
    '2-1': require('./img/2-1.png'),
    '2-2': require('./img/2-2.png'),
    '3-0': require('./img/3-0.png'),
    '3-1': require('./img/3-1.png'),
    '3-2': require('./img/3-2.png'),
    '3-3': require('./img/3-3.png'),
    '4-0': require('./img/4-0.png'),
    '4-1': require('./img/4-1.png'),
    '4-2': require('./img/4-2.png'),
    '4-3': require('./img/4-3.png'),
    '4-4': require('./img/4-4.png'),
    '5-0': require('./img/5-0.png'),
    '5-1': require('./img/5-1.png'),
    '5-2': require('./img/5-2.png'),
    '5-3': require('./img/5-3.png'),
    '5-4': require('./img/5-4.png'),
    '5-5': require('./img/5-5.png'),
    '6-0': require('./img/6-0.png'),
    '6-1': require('./img/6-1.png'),
    '6-2': require('./img/6-2.png'),
    '6-3': require('./img/6-3.png'),
    '6-4': require('./img/6-4.png'),
    '6-5': require('./img/6-5.png'),
    '6-6': require('./img/6-6.png'),
    'blank': require('./img/blank.png')
}
export default (item = null) => item == null
    ?
    tiles['blank']?.default
    :
    item[0] > item[1]
        ?
        tiles[item[0] + '-' + item[1]]?.default
        :
        tiles[item[1] + '-' + item[0]]?.default;