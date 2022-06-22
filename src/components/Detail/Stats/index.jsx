import classNames from 'classnames/bind';
import styles from './Stats.module.scss';

const cx = classNames.bind(styles);

function Stats({ stats = [] }) {
    const statsTitle = ['HP', 'ATK', 'DES', 'SpA', 'SpD', 'SPD'];

    return (
        <div className={cx('wrapper')}>
            {stats.map((stat, index) => (
                <div key={index}>
                    <h3 className={cx(`stats--${statsTitle[index]}`)}>{statsTitle[index]}</h3>
                    <span>{stat.base_stat}</span>
                </div>
            ))}
        </div>
    );
}

export default Stats;
