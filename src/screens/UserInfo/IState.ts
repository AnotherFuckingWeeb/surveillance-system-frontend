import { ICamera } from "../../../types/Types";

export interface IState {
  isEditable: boolean;
  isModalVisible: boolean;
  loading: boolean;
  success: boolean;
  cameras: ICamera[];
  deletedCameras: ICamera[];
  dni: string;
  name: string;
  lastname: string;
  message: string;
}
