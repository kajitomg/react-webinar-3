import useSelector from "./use-selector";
import useStore from "./use-store";
import {useCallback} from "react";

export default function useLanguage(){
  const store = useStore()

  const select = useSelector(state => ({
    language:state.language.language,
    words:state.language.words
  }));

  const callbacks = {
    setLanguage: useCallback((language) => {
      store.actions.language.setLanguage(language)
    }, [store]),
  }

  return [select.words,select.language,callbacks.setLanguage]
}