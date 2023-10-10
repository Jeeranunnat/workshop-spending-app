import PropTypes from 'prop-types';
import './Items.css';
const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
const Item = (props) => {
  const { title, amount } = props;
  const status = amount < 0 ? 'expense' : 'income';
  const symbol = amount < 0 ? '-' : '+';
  // const name = 'เดินห้างซื้อของ';
  // const amount = 5000;
  return (
    <li className={status}>
      {title}{' '}
      <span>
        {symbol}
        {formatNumber(Math.abs(amount).toFixed(2))}
      </span>
    </li>
  );
};
Item.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
export default Item;
