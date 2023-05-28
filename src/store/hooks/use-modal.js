import useStore from "./use-store";
import {useCallback} from "react";

export default function useModal(name){
  const store = useStore();

  const callbacks = {
    // Открытие модального окна
    openModal: useCallback(() => store.actions.modals.openModal(name), [store]),
    // Закрытие модального окна
    closeModal: useCallback(() => store.actions.modals.closeModal(name), [store]),
  }

  return {openModal:callbacks.openModal,closeModal:callbacks.closeModal}
}