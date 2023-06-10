import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Comments({comments, renderItem,nested}){
  const cn = bem('Comments');

  return (
    <div className={cn({nested})}>{
      comments.map(item =>
        <div key={item._id} className={cn('items')}>
          {renderItem(item)}
        </div>
      )}
    </div>
  )
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
  nested:PropTypes.bool
};

Comments.defaultProps = {
  renderItem: (item) => {},
  nested:false
}

export default memo(Comments);
