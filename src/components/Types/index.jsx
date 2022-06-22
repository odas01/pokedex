import classNames from 'classnames/bind';
import styles from './Types.module.scss';

const cx = classNames.bind(styles);

function Types({ types = [] }) {
    return (
        <div className={cx('wrapper')}>
            {types.map((type, index) => (
                <span key={index} className={cx(`type--${type}`)}>
                    {type}
                </span>
            ))}
        </div>
    );
}

export default Types;
