import { ImageProps } from "react-native";
import { IProps as CustomInputProps } from "../../components/CustomInput/IProps";
import { NavigationProps } from "../../Route/types";

export interface ISlices {
  id: string;
  image: ImageProps;
  title: string;
  text: string;
  inputs: CustomInputProps[];
  end: boolean;
}

export interface IProps {
  navProps: NavigationProps<"SignUp">;
}
