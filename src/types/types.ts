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
    refreshToken: string;
  }
}

export interface IAuthResponseError {
  body: {
    error: string;
    success: boolean;
  }
}

export interface IAccessTokenResponse {
  statusCode: number;
  body: {
    accessToken: string;
  }
}

// Tasks Response
export interface ITask {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface ITasksResponse {
  statusCode: number;
  body: {
    message: string;
    success: boolean;
    tasks: ITask[];
  }
}