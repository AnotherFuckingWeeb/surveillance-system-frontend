import { IUser } from "../../types/Types";

export interface ContextType {
  user: IUser;
  loading: boolean;
  login: (dni: number, password: string) => Promise<void>;
  signUp: (
    dni: number,
    name: string,
    lastname: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  toggleLoading: () => void;
}
