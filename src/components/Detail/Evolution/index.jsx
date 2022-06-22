import classNames from 'classnames/bind';
import styles from './Evolution.module.scss';
import { useContext } from 'react';
import { EvolutionContext } from '~/components/Detail';
import { FuncSetDetailContext } from '~/App';
import { baseUrl } from '~/utils/api';

const cx = classNames.bind(styles);

function Evolution() {
    let evolution = useContext(EvolutionContext);
    const funcCallBack = useContext(FuncSetDetailContext);

    const setUpPoke = (data) => {
        return {
            id: data.species?.url?.slice(42).replace('/', ''),
            name: data.species.name,
            minLevel: data?.evolution_details[0]?.min_level,
        };
    };

    const getInfo = () => {
        const poke = [];
        if (evolution.evolves_to) {
            do {
                poke.push(setUpPoke(evolution));
                evolution = evolution.evolves_to[0];

                if (evolution?.evolves_to.length === 0) {
                    poke.push(setUpPoke(evolution));
                }
            } while (evolution?.evolves_to.length > 0);
        }
        return poke;
    };

    const data = getInfo();

    return (
        <div className={cx('wrapper')}>
            {data.map((item, index) => {
                const img = baseUrl.getImage(item.id);
                return (
                    <div key={item.id} className={cx('info')} onClick={() => funcCallBack(item.id)}>
                        {index > 0 && <span>{item.minLevel || '?'}</span>}
                        <img src={img} alt={item.name} />
                    </div>
                );
            })}
        </div>
    );
}

export default Evolution;
