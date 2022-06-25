import { useEffect, useState, useCallback, createContext } from 'react';
import { Row, Col, BackTop, Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';

import './App.scss';
import { pokeApi } from '~/utils/api';

import Search from '~/components/Search';
import Detail from '~/components/Detail';
import ListItem from '~/components/ListItem';
import Filter from '~/components/Filter';

export const FuncSetDetailContext = createContext();

function App() {
    //list default
    const [listDefault, setListDefalt] = useState([]);
    const [fullList, setFullList] = useState([]);

    //types
    const [fullType, setFullType] = useState([]);

    //limit
    const [limit, setLimit] = useState(50);
    const [limitDefault, setLimitDefault] = useState(50);

    //detail Pokemon
    const [detail, setDetail] = useState(0);

    //animation
    const [aniSlide, setAniSlide] = useState('');

    //seach
    const [listSearch, setListSearch] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    //filter
    const [listFilter, setListFilter] = useState([]);
    const [isFilter, setIsFilter] = useState(false);

    //loadMore
    const [isLoadMore, setIsLoadMore] = useState(true);

    // index list current -> 1: search, 2: filter, 0: fullList
    const [indexList, setIndexList] = useState(0);

    useEffect(() => {
        const getFullTypes = async (url) => {
            const res = await fetch(url);
            const result = await res.json();

            return {
                name: result.name,
                type: result.types.map((item) => item.type.name),
                url: url,
            };
        };

        const getPokemons = async () => {
            if (limit >= 800) {
                setLimitDefault(898 - limit);
                setIsLoadMore(false);
            }

            const listDefault = await pokeApi.loadPokemon(limit);
            const fullList = await pokeApi.loadPokemon(898);

            fullList.results.forEach(async (item) => {
                const types = await getFullTypes(item.url);
                setFullType((prev) => [...prev, types]);
            });

            setListDefalt(listDefault.results);
            setFullList(fullList.results);
        };

        getPokemons();
    }, [limit]);

    //callBack func
    const searchCallBack = (result, isSearch) => {
        setIsSearch(isSearch);
        setListSearch(result);

        setIsLoadMore(!isSearch);

        if (isSearch) {
            setIndexList(1);
        } else if (!isSearch && isFilter) {
            setIndexList(2);
            setIsLoadMore(false);
        } else if (!isSearch) {
            setIndexList(0);
        }
    };

    const filterCallBack = (result, isFilter) => {
        setIsFilter(isFilter);
        setListFilter(result);

        setIsLoadMore(!isFilter);

        if (!isFilter) {
            setIndexList(0);
            if (isSearch) {
                setIndexList(1);
                setIsLoadMore(false);
            }
        } else setIndexList(2);
    };

    //handleCallBack
    const handleSetLimit = () => {
        limit > 800 && setIsLoadMore(false);

        setLimit((prev) => prev + limitDefault);
    };

    const handleSetDetail = useCallback((id) => {
        setTimeout(() => {
            setDetail(id);
        }, 500);

        setAniSlide('slideIn');
    }, []);

    //filterCallBack
    const filterToSearch = (fullType = [], listSearch = []) => {
        return fullType.filter((itemType) => listSearch.some((itemSearch) => itemSearch.name === itemType.name));
    };

    return (
        <FuncSetDetailContext.Provider value={handleSetDetail}>
            <div className="wrapper">
                <div className="container">
                    <Row gutter={[20, 20]}>
                        <Col xs={16}>
                            <div className="header">
                                <Search data={isFilter ? listFilter : fullList} searchCallBack={searchCallBack} />

                                <Filter
                                    data={isSearch ? filterToSearch(fullType, listSearch) : fullType}
                                    filterCallBack={filterCallBack}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col xl={16} md={10} xs={24}>
                            <Row gutter={[20, 80]}>
                                <ListItem
                                    indexList={indexList}
                                    listDefault={listDefault}
                                    listSearch={listSearch}
                                    listFilter={listFilter}
                                    handleSetDetail={handleSetDetail}
                                />
                            </Row>
                            {isLoadMore && (
                                <Row justify="center">
                                    <Button className="loadMore" type="primary" onClick={handleSetLimit}>
                                        LOAD MORE
                                    </Button>
                                </Row>
                            )}
                        </Col>
                        <Col xl={8} md={10}>
                            <div onAnimationEnd={() => setAniSlide('')}>
                                <Detail id={detail} aniSlide={aniSlide} />
                            </div>
                        </Col>
                    </Row>
                </div>

                <BackTop>
                    <Button className="backTop" type="primary" title="Go to top">
                        <UpOutlined />
                    </Button>
                </BackTop>
            </div>
        </FuncSetDetailContext.Provider>
    );
}

export default App;
