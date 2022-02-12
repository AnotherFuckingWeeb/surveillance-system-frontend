import { ImageProps } from "react-native";
import { IProps as CustomInputProps } from "../CustomInput/IProps";

export interface IProps {
  id: string;
  image: ImageProps;
  title: string;
  text: string;
  end: boolean;
  inputs: CustomInputProps[];
  scrollTo: () => void;
  onFinishCallback: () => void;
}
