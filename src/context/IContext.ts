import { IUser, ICamera } from "../../types/Types";

export interface IContext {
  user: IUser;
  cameras: ICamera[];
  login: (dni: number, password: string) => Promise<string | void>;
  addCamera: (newCamera: ICamera) => void;
  signup: (
    dni: number,
    name: string,
    lastname: string,
    password: string
  ) => Promise<string>;
  logout: () => Promise<void>;
}
