import Items from './Items';
import './Transection.css';
//import { v4 as uuidv4 } from 'uuid';
//import DataContext from '../data/DataContext';

const Transection = (props) => {
  const { items } = props;
  return (
    <div>
      <ul className="item-list">
        {items.map((element) => {
          // return <Items title={element.title} amount={element.amount} />;
          return <Items {...element} key={element.id} />;
        })}
      </ul>
      {/* <DataContext.Consumer>{(value) => <p>{value}</p>}</DataContext.Consumer> */}
    </div>
  );
};
export default Transection;
