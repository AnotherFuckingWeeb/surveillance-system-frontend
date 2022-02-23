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

export interface IAuthResponse {
  message: string;
  token: string;
  user: IUser;
}

export interface IUserInfo {
  user: IUser;
  cameras: ICamera[];
}
