import { SmileOutlined } from '@ant-design/icons';
import { Checkbox, Row, Col } from 'antd';
import Tippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';
import { useState, useEffect, memo } from 'react';

import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

const types = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
];

function Filter({ data, filterCallBack }) {
    const [filterTypes, setFilterTypes] = useState([]);
    console.log(data);
    useEffect(() => {
        const results = data
            .map((itemData) => {
                const bool =
                    filterTypes.length > 0
                        ? filterTypes.every((itemFilter) => itemData.type.includes(itemFilter))
                        : false;
                return bool && itemData;
            })
            .filter((item) => item);

        filterCallBack(results, !!filterTypes.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterTypes]);

    const handleSetTypes = (status, name) => {
        status
            ? setFilterTypes((prev) => [...prev, name])
            : setFilterTypes((prev) => prev.filter((item) => !(item === name)));
    };

    return (
        <div className={cx('wrapper')}>
            <Tippy
                offset={[350, -50]}
                interactive
                trigger="click"
                render={(attrs) => (
                    <div className={cx('menu')}>
                        <Row justify="start" tabIndex="-1" {...attrs}>
                            {types.map((type, index) => (
                                <Col xs={4} key={index}>
                                    <Checkbox
                                        className={cx('menu-item')}
                                        key={index}
                                        onChange={(e) => handleSetTypes(e.target.checked, type)}
                                    >
                                        {type}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            >
                <button>
                    <SmileOutlined style={{ fontSize: '24px', color: '#e74c3c' }} />
                    <span>Filter</span>
                </button>
            </Tippy>
        </div>
    );
}

export default memo(Filter);
