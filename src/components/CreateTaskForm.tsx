
import Modal from './Modal.tsx';


interface ICreateTaskForm {
  isOpen: boolean;
  closeModal: () => void;
}

const CreateTaskForm = ({ isOpen, closeModal } : ICreateTaskForm) => {

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <form className='bg-white w-full max-w-[600px] min-w-[350px] rounded-lg flex flex-col gap-5'>
        <div className='py-6 flex flex-col gap-2'>
          <label className='block' htmlFor="title">Title</label>
          <input 
            type="text" 
            name="title" 
            id="title"
            className='border-2 border-slate-200 py-2 px-4 rounded-md bg-white text-slate-900'
          />
        </div>
        <input className='bg-violet-500 text-slate-50 px-6 py-2 border border-violet-600 rounded-md cursor-pointer' type="submit" value="Save" />
      </form>
    </Modal>
  )
}

export default CreateTaskForm
