import { ImageProps } from "react-native";

export interface IProps {
  image: ImageProps;
  text: string;
  displayDeleteButton: boolean;
  onPress: () => void;
  onCancellable: () => void;
}
