import {memo} from "react";
import PropTypes from "prop-types";
import LanguageControls from "../language-controls";
import './style.css';

function Head(props){
  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      <LanguageControls words={props.words} setLanguage={props.setLanguage}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  words:PropTypes.object,
  setLanguage:PropTypes.func
};

export default memo(Head);
