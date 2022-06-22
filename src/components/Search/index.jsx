import classNames from 'classnames/bind';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect } from 'react';

import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search({ data, searchCallBack }) {
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 700);

    const inputRef = useRef();

    useEffect(() => {
        const results = data.filter((item) => item.name.indexOf(searchValue.toLowerCase()) !== -1);

        searchCallBack(results, !!debouncedValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    return (
        <div className={cx('wrapper')}>
            <input
                className={cx('input')}
                placeholder="Enter yourname Pokemon"
                value={searchValue}
                ref={inputRef}
                onChange={(e) => setSearchValue(e.target.value)}
            />

            {!!searchValue && (
                <button className={cx('close')} onClick={handleClear}>
                    <CloseCircleOutlined />
                </button>
            )}

            <button className={cx('btn')}>
                <SearchOutlined />
            </button>
        </div>
    );
}

export default Search;
