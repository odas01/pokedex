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
    const [listPokemon, setListPokemon] = useState([]);
    const [fullListPokemon, setFullListPokemon] = useState([]);

    //types
    const [fullListType, setFullListType] = useState([]);

    //limit
    const [limit, setLimit] = useState(50);
    const [limitDefault, setLimitDefault] = useState(50);

    //detail Pokemon
    const [detail, setDetail] = useState(0);

    //animation
    const [aniSlide, setAniSlide] = useState('');

    //seach
    const [listSearchPokemon, setListSearchPokemon] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    //filter
    const [listFilterPokemon, setListFilterPokemon] = useState([]);
    const [isFilter, setIsFilter] = useState(false);

    //loadMore
    const [isLoadMore, setIsLoadMore] = useState(true);

    useEffect(() => {
        const getPokemon = async () => {
            try {
                if (limit >= 800) {
                    setLimitDefault(898 - limit);
                }

                const res = await pokeApi.loadPokemon(limit);
                const full = await pokeApi.loadPokemon(898);

                setListPokemon(res.results);
                setFullListPokemon(full.results);

                const getFullListTypes = async (url) => {
                    try {
                        const res = await fetch(url);
                        const result = await res.json();

                        return {
                            name: result.name,
                            type: result.types.map((item) => item.type.name),
                            url: url,
                        };
                    } catch {
                        console.log('error');
                    }
                };
                full.results.forEach(async (item) => {
                    const types = await getFullListTypes(item.url);
                    setFullListType((prev) => [...prev, types]);
                });
            } catch {
                console.log('error');
            }
        };

        getPokemon();
    }, [limit]);

    const searchCallBack = (result, isSearch) => {
        setListSearchPokemon(result);
        setIsSearch(isSearch);
        setIsLoadMore(!isSearch);
    };

    const filterCallBack = (result, isFilter) => {
        setListFilterPokemon(result);
        setIsFilter(isFilter);
        setIsLoadMore(!isFilter);
    };

    const handleSetLimit = () => {
        if (limit > 800) {
            setIsLoadMore(false);
        }
        setLimit((prev) => prev + limitDefault);
    };

    const handleSetDetail = useCallback((id) => {
        setTimeout(() => {
            setDetail(id);
        }, 500);
        setAniSlide('slideIn');
    }, []);

    return (
        <FuncSetDetailContext.Provider value={handleSetDetail}>
            <div className="wrapper">
                <div className="container">
                    <Row gutter={[20, 20]}>
                        <Col xs={16}>
                            <div className="header">
                                <Search data={fullListPokemon} searchCallBack={searchCallBack} />

                                <Filter data={fullListType} filterCallBack={filterCallBack} />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col xs={16}>
                            <Row gutter={[20, 80]}>
                                <ListItem
                                    handleSetDetail={handleSetDetail}
                                    listPokemon={listPokemon}
                                    isSearch={isSearch}
                                    listSearchPokemon={listSearchPokemon}
                                    isFilter={isFilter}
                                    listFilterPokemon={listFilterPokemon}
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
                        <Col xs={8}>
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
