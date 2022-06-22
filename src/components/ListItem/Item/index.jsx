import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Col } from 'antd';

import { pokeApi, baseUrl } from '~/utils/api';
import styles from './Item.module.scss';

import Types from '~/components/Types';

const cx = classNames.bind(styles);

function Item({ id, onClick = () => {} }) {
    const [detail, setDetail] = useState({});
    const [types, setTypes] = useState([]);

    //get images
    const imgSrc = baseUrl.getImage(id);

    useEffect(() => {
        const getDetail = async () => {
            try {
                const res = await pokeApi.detailPokemon(id);
                setDetail(res);
                setTypes(res.types.map((item) => item.type.name));
            } catch {
                console.log('error');
            }
        };
        getDetail();
    }, [id]);

    return (
        <Col xl={6} md={12} xs={12} onClick={onClick}>
            <div className={cx('wrapper')}>
                <div className={cx('img')}>
                    <img src={imgSrc} alt={detail.name} />
                </div>

                <div className={cx('content')}>
                    <span className={cx('id')}>#{detail.id}</span>
                    <span className={cx('name')}>{detail.name}</span>
                    <Types types={types} />
                </div>
            </div>
        </Col>
    );
}

export default Item;
