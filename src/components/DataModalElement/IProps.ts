import { ImageProps } from "react-native";

export interface IProps {
  id: number;
  image: ImageProps;
  text: string;
  onPress: () => void;
}
