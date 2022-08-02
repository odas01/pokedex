import { memo } from 'react';

import Item from './Item';

function ListItem({ indexList, listDefault, listSearch, listFilter, handleSetDetail }) {
    let arrList = [];
    switch (indexList) {
        case 1:
            arrList = listSearch;
            break;
        case 2:
            arrList = listFilter;
            break;
        default:
            arrList = listDefault;
    }
    return arrList.map((item) => {
        const id = item.url.slice(34).replace('/', '');
        return <Item key={id} id={id} url={item.url} onClick={() => handleSetDetail(id)} />;
    });
}

export default memo(ListItem);
