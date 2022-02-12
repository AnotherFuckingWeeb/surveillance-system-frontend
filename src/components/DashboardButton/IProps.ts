import { ImageProps } from "react-native";

export interface IProps {
  image: ImageProps;
  text: string;
  onPress?: () => void;
}
