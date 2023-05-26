import React, {memo, useCallback} from 'react';
import {cn as bem} from '@bem-react/classname'
import {capitalizeFirstLetter} from "../../utils";
import {languageTypes} from "../../store/language";
import useLanguage from "../../store/hooks/use-language";
import './style.css'

function LanguageControls (){
  const cn = bem('LanguageControls')

  const [words,language,setLanguage] = useLanguage()

  const callbacks = {
    onSelect: useCallback((e) => {
      setLanguage(e.target.value);
  }, []),
  }

  return (
    <select className={cn()} onChange={callbacks.onSelect}>
      <option value={languageTypes.russian}>{capitalizeFirstLetter(words.language.russian)}</option>
      <option value={languageTypes.english}>{capitalizeFirstLetter(words.language.english)}</option>
    </select>
  );
}

export default memo(LanguageControls);