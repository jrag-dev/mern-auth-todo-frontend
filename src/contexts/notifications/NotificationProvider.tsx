import React, { createContext, useReducer } from "react";
import { INotification, INotificationContext } from "../../types/types.ts";


interface INotificationProviderProps {
  children: React.ReactNode;
}

// Create the Context
const defaultState = {
  notifications: [],
  addNotification: (_notification: Omit<INotification, 'id'>) => {}
} as INotificationContext

export const NotificationContext = createContext<INotificationContext>(defaultState);

// Initial State
const initialState: { notifications: INotification[] } = {
  notifications: [],
}

// Reducer
type Action =
  | { type: 'ADD_NOTIFICATION'; payload: INotification }
  | { type: 'REMOVE_NOTIFICATION'; payload: number}

const notificationReducer = (state: typeof initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

// Contect Provider
export const NotificationProvider = ({ children }: INotificationProviderProps) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = (notification: Omit<INotification, 'id'>) => {
    const id = Date.now();
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        ...notification, id
      }
    });

    // Delete this notification after 3 seconds
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        payload: id
      })
    }, 5000)
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        addNotification
      }}
    >
      { children }
    </NotificationContext.Provider>
  )
}