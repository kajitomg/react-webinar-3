import React, {memo, useCallback} from 'react';
import {cn as bem} from '@bem-react/classname'
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {capitalizeFirstLetter} from "../../utils";
import {languageTypes} from "../../store/language";
import './style.css'

function LanguageControls (){

  const cn = bem('LanguageControls')

  const store = useStore();

  const select = useSelector(state => ({
    language:state.language.words.words
  }));

  const callbacks = {
    onSelect: useCallback((e) => {
      console.log(e);
      store.actions.language.setLanguage(e.target.value);
  }, [store]),
  }

  return (
    <>
    <select className={cn()} onChange={callbacks.onSelect}>
      <option value={languageTypes.russian}>{capitalizeFirstLetter(select.language.language.russian)}</option>
      <option value={languageTypes.english}>{capitalizeFirstLetter(select.language.language.english)}</option>
    </select>
    </>
  );
}

export default memo(LanguageControls);