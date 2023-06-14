import useServices from "./use-services";
import {useCallback, useLayoutEffect, useMemo, useState} from "react";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n
  const api = useServices().api

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
  const unsubscribeApi = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return api.subscribe(() => {
      api.setHeader(i18n.config.modules.session.languageHeader,i18n.language)
    });
  }, []);  // Нет зависимостей - исполнится один раз

  // Отписка от i18n и api при демонтировании компонента
  useLayoutEffect(() => {unsubscribeApi;unsubscribeI18n}, [unsubscribeI18n,unsubscribeApi]);

  return state
}