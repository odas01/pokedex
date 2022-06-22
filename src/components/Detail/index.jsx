import classNames from 'classnames/bind';
import { Affix } from 'antd';
import { useEffect, useState, createContext } from 'react';

import { pokeApi, baseUrl } from '~/utils/api';
import styles from './Detail.module.scss';
import noPokeImg from '~/assets/img/poke.png';

import DetailContent from './DetailContent';
import Types from '~/components/Types';

const cx = classNames.bind(styles);

export const EvolutionContext = createContext();

function Detail({ id, aniSlide }) {
    const [detail, setDetail] = useState({});
    const [types, setTypes] = useState([]);
    const [evolution, setEvonlution] = useState({});

    //get url images
    const imgUrl = id < 650 ? baseUrl.getGif(id) : baseUrl.getImage(id);

    useEffect(() => {
        const getDetail = async () => {
            try {
                const resDetail = await pokeApi.detailPokemon(id);
                const resEntries = await pokeApi.entriesPokemon(id);

                const resEvolution = await fetch(resEntries.evolution_chain.url);
                const result = await resEvolution.json();

                setDetail(resDetail);
                setTypes(resDetail.types.map((item) => item.type.name));
                setEvonlution(result.chain);
            } catch {
                console.log('error');
            }
        };
        id && getDetail();
    }, [id]);

    return (
        <EvolutionContext.Provider value={evolution}>
            <Affix offsetTop={150}>
                <div className={cx('wrapper', aniSlide)}>
                    <img src={!id ? noPokeImg : imgUrl} className={cx('img')} alt="avc" />

                    {!id ? (
                        <span className={cx('des')}>
                            Select 1 pokemon on the screen
                            <br /> or search on the search bar{' '}
                        </span>
                    ) : (
                        <div className={cx('detail')}>
                            <div className={cx('detail_wrap')}>
                                <span className={cx('id')}>#{id}</span>
                                <span className={cx('name')}>{detail.name}</span>
                                <Types types={types} />
                            </div>

                            <DetailContent detail={detail} id={id} />
                        </div>
                    )}
                </div>
            </Affix>
        </EvolutionContext.Provider>
    );
}

export default Detail;
