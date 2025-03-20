import React from 'react'
import { useNotifications } from '../hooks/useNotification.ts'
import { INotification } from '../types/types.ts'


export const NotificationItem: React.FC<INotification> = ({ id, message, error }) => {
  return (
    <div className={`${error ? 'bg-rose-200 text-rose-500 border-rose-500' : 'bg-violet-200 text-violet-500 border-violet-500'} border-2 py-2.5 px-4 rounded`}>
      <div className='flex items-center gap-3'>
        <div className=''>
          {
            !error
              ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              )
          }
        </div>
        <span>
          {message}
        </span>
      </div>
    </div>
  )
}


export const NotificationsList: React.FC = () => {
  const { notifications } = useNotifications();

  return (
    <div className='fixed top-20 right-4 w-full max-w-[300px] rounded'>
      {
        notifications.map((notification) => {
          return (
            <NotificationItem
              key={notification.id}
              {...notification}
            />
          )
        })
      }
    </div>
  )
}