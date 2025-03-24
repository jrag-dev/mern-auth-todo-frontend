import { useState } from "react"

interface IUseModal {
  isOpenModal: boolean;
  handlerOpenModal: () => void;
  handlerCloseModal: () => void;
}

export function useModal(): IUseModal{
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handlerOpenModal = (): void => {
    setIsOpenModal(true);
  }

  const handlerCloseModal = (): void => {
    setIsOpenModal(false);
  }

  return {
    isOpenModal,
    handlerOpenModal,
    handlerCloseModal
  }
}