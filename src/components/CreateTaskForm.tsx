
import React, { useState } from 'react';
import Modal from './Modal.tsx';
import { useTasksContext } from '../hooks/useTasks.ts';
import { IAlertResponse, ITaskForm } from '../types/types.ts';
import Alert from './Alert.tsx';


interface ICreateTaskForm {
  isOpen: boolean;
  closeModal: () => void;
}


const initialState: ITaskForm = {
  _id: null,
  title: '',
  completed: false,
  createdAt: null
}

const CreateTaskForm = ({ isOpen, closeModal } : ICreateTaskForm) => {
  const [taskForm, setTaskForm] = useState<ITaskForm>(initialState);
  const [alertResponse, setAlertResponse] = useState<IAlertResponse| null>(null);

  const { addTask } = useTasksContext();


  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]: e.target.value
    })
  }

  const handlerSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskForm.title === '') {
      setAlertResponse({
        message: 'Title field is required',
        success: false
      })
      return;
    }

    addTask(taskForm)

    setAlertResponse(null);
    closeModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <form 
        className='bg-white w-full max-w-[600px] min-w-[350px] rounded-lg flex flex-col gap-5'
        onSubmit={handlerSubmitForm}
      >
        {
          alertResponse && (
            <Alert
              alert={alertResponse}
            />
          )
        }
        <div className='py-6 flex flex-col gap-2'>
          <label className='block' htmlFor="title">Title</label>
          <input 
            type="text" 
            name="title" 
            id="title"
            className='border-2 border-slate-200 py-2 px-4 rounded-md bg-white text-slate-900'
            onChange={handlerChange}
          />
        </div>
        <input className='bg-violet-500 text-slate-50 px-6 py-2 border border-violet-600 rounded-md cursor-pointer' type="submit" value="Save" />
      </form>
    </Modal>
  )
}

export default CreateTaskForm
