import { IAlertResponse } from "../types/types.ts";

interface IAlertProps {
  alert: IAlertResponse;
}

const Alert = ({ alert }: IAlertProps) => {
  const { message, success } = alert;

  return (
    <div className={`relative ${success ? 'bg-violet-200 text-violet-600 border-2 border-violet-500' : 'bg-rose-200 text-rose-600 border-2 border-rose-500'} flex items-center gap-3 py-2 px-6 rounded-md text-center font-medium`}>
      <div className="absolute top-2 right-4">
        {
          success
            ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            ): (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            )
        }
      </div>
      <span>
        {message}
      </span>
    </div>
  )
}

export default Alert
