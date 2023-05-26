import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LanguageControls from "../language-controls";

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
