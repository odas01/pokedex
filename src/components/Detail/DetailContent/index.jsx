import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Types from '~/components/Types';
import Stats from '../Stats';
import Evolution from '../Evolution';
import styles from './DetailContent.module.scss';

const cx = classNames.bind(styles);

function DetailContent({ id, detail }) {
    const [doubleDamgeFrom, setDoubleDamgeFrom] = useState([]);
    const [halfDamgeFrom, setHalfDamgeFrom] = useState([]);

    const types = detail.types;

    const convertArray = (data) => data.map((item) => item.name);

    useEffect(() => {
        setDoubleDamgeFrom([]);
        setHalfDamgeFrom([]);

        const getDamgeRela = async (url) => {
            try {
                const res = await fetch(url);
                const result = await res.json();
                return result.damage_relations;
            } catch {
                console.log('error');
            }
        };

        if (id) {
            types &&
                types.forEach(async (type) => {
                    const result = await getDamgeRela(type.type.url);

                    const arrDbDamgeFrom = convertArray(result.double_damage_from);
                    const arrHfDamgeFrom = convertArray(result.half_damage_from);

                    setDoubleDamgeFrom((prev) => [...prev, ...arrDbDamgeFrom]);
                    setHalfDamgeFrom((prev) => [...prev, ...arrHfDamgeFrom]);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [types]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('cluster')}>
                    <h3>Height</h3>
                    <span>{detail.height / 10}m</span>
                </div>
                <div className={cx('cluster')}>
                    <h3>Weight</h3>
                    <span>{detail.weight / 10}kg</span>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('cluster')}>
                    <h3>Weaknesses</h3>
                    <Types
                        types={Array.from(new Set(doubleDamgeFrom)).filter((item) => !halfDamgeFrom.includes(item))}
                    />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('cluster')}>
                    <h3>Stats</h3>
                    <Stats stats={detail.stats} />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('cluster')}>
                    <h3>Evolutions</h3>
                    <Evolution />
                </div>
            </div>
        </div>
    );
}

export default DetailContent;
