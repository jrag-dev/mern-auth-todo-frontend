import React, { useRef } from "react"

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

const Modal = ({ children, isOpen, closeModal }: IModalProps) => {

  return (
    <section className={`${isOpen ? 'fixed top-0 right-0 bottom-0 z-10' : 'none'} bg-slate-950/80 w-full grid place-items-center`}>
      <article 
        className="flex flex-col bg-white px-6 py-20 rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
          <button
            type="button"
            className="cursor-pointer w-10 bg-rose-500 h-10 flex flex-col justify-center items-center rounded-full text-white absolute top-4 right-4"
            onClick={() => closeModal()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          { children }
      </article>
    </section>
  )
}

export default Modal
