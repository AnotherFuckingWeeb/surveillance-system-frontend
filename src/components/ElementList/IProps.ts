import { ImageProps } from "react-native";
import { ICamera } from "../../../types/Types";

export interface IProps {
  header: string;
  dataIcon: ImageProps;
  cameras: ICamera[];
  readOnly: boolean;
  onPressButton: () => void;
  onPressCancellableButton: (id: number) => void;
}
