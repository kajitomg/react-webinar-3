import {memo, useEffect} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };
  const nesting = (options, value) => {
    let back = ''
    options.forEach((option,i) => {
      if(value === option.value){
        back += '- '
        if(option.parent){
          back += nesting(options.slice(0,i),option.parent._id)
        }
      }
    })
    return back
  }

  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {props.options.map((item,i) => (
        <option key={item.value} value={item.value}>{nesting(props.options.slice(0,i),item?.parent?._id)}{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

Select.defaultProps = {
  onChange: () => {}
}

export default memo(Select);
