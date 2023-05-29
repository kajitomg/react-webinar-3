import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, renderItem, words}){

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item._id} className='List-item'>
          {renderItem(item,words)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
  words:PropTypes.object
};

List.defaultProps = {
  renderItem: (item) => {},
  words:{}
}

export default memo(List);
