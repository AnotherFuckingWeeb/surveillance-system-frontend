import { IUser } from "../../../types/Types";

export interface IState {
  users: IUser[];
  loading: boolean;
}
