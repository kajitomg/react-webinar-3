import {memo} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "style.css"


function LinkMain(props){
  return (
    <span className='LinkMain'>
      <Link to={props.to}>{props.title}</Link>
    </span>
  );
}

LinkMain.propTypes = {
  title:PropTypes.string,
  to:PropTypes.string
};

export default memo(LinkMain);