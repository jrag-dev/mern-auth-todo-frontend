// Alerts
export interface IAlertResponse {
  message: string;
  success: boolean;
}


// Notifications
export interface INotification {
  id: number;
  message: string;
  error: boolean;
}

export interface INotificationContext {
  notifications: INotification[];
  addNotification: (notification: Omit<INotification, 'id'>) => void;
}


// Input User Data
export interface ISignupData {
  name: string,
  username: string,
  email: string,
  password: string
}

export interface ICredentials {
  email: string;
  password: string;
}

// AuthContext
export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
}

export interface IAuthResponse {
  body: {
    success: boolean;
    user: IUser;
    accessToken: string;
    refreskToken: string;
  }
}

export interface IAuthResponseError {
  body: {
    error: string;
    success: boolean;
  }
}