export interface IUser {
  id: number;
  role: number;
  dni: number;
  name: string;
  lastname: string;
}

export interface ICamera {
  id: number;
  uid: number;
  brand: string;
  area: string;
  description: string;
}

export interface IReport {
  ID: number;
  UID: number;
  CreatedAt: string;
  CreatedBy: string;
  Description: string;
}

export interface IAuthResponse {
  message: string;
  token: string;
  user: IUser;
}

export interface IUserInfo {
  user: IUser;
  cameras: ICamera[];
}
