import React, {memo, useCallback} from 'react';
import {cn as bem} from '@bem-react/classname'
import {capitalizeFirstLetter} from "../../utils";
import {languageTypes} from "../../store/language";
import propTypes from "prop-types";
import './style.css'

function LanguageControls (props){
  const cn = bem('LanguageControls')
  const callbacks = {
    onSelect: useCallback((e) => props.setLanguage(e.target.value), []),
  }

  return (
    <select className={cn()} onChange={callbacks.onSelect} value={props.language}>
      <option value={languageTypes.russian} >{capitalizeFirstLetter(props.words.language.russian)}</option>
      <option value={languageTypes.english} >{capitalizeFirstLetter(props.words.language.english)}</option>
    </select>
  );
}
LanguageControls.propTypes = {
  setLanguage: propTypes.func,
  words: propTypes.object.isRequired,
  language:propTypes.string.isRequired
}
LanguageControls.defaultProps = {
  setLanguage: () => {}
}
export default memo(LanguageControls);