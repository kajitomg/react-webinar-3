import {memo} from "react";
import PropTypes from "prop-types";
import LanguageControls from "../language-controls";
import './style.css';

function Head(props){

  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      <LanguageControls words={props.words} setLanguage={props.setLanguage} language={props.language}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  words:PropTypes.object.isRequired,
  language:PropTypes.string.isRequired
};
Head.defaultProps = {
  title: 'Страница',
  setLanguage:() => {}
};

export default memo(Head);
