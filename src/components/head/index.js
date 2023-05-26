import {memo} from "react";
import PropTypes from "prop-types";
import LanguageControls from "../language-controls";
import './style.css';

function Head({title}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <LanguageControls/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
