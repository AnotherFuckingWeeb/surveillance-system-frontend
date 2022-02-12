import { ImageProps } from "react-native";

export interface IProps {
  image: ImageProps;
  header: string;
  subHeader?: string;
  onPress: () => void;
}
