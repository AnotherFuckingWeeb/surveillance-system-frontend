export interface IUser {
  id: number;
  role: number;
  dni: number;
  name: string;
  lastname: string;
  password: string;
}

export interface ICamera {
  id: number;
  uid: number;
  brand: string;
  area: string;
  description: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}
