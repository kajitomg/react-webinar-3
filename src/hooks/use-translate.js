import useServices from "./use-services";
import {useCallback, useLayoutEffect, useMemo, useState} from "react";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n

  const props = useCallback(() => {
    return {
      lang:i18n.language,
      setLang:(lang) => {
        return i18n.setLanguage(lang)
      },
      t:(text,plural,lang) => {
        return i18n.translate(lang,text,plural)
      }
    }
  },[i18n])

  const [state,setState] = useState(props())

  const unsubscribeI18n = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return i18n.subscribe(() => {
      setState(props);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от i18n при демонтировании компонента
  useLayoutEffect(() => unsubscribeI18n, [unsubscribeI18n]);

  return state
}