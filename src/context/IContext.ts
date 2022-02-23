import { IUser } from "../../types/Types";

export interface IContext {
  user: IUser;
  login: (dni: number, password: string) => Promise<string | void>;
  signup: (
    dni: number,
    name: string,
    lastname: string,
    password: string
  ) => Promise<string>;
  logout: () => Promise<void>;
}
