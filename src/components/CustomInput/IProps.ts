import { KeyboardTypeOptions } from "react-native";

export interface IProps {
  value: string;
  label?: string;
  type: KeyboardTypeOptions;
  placeholder?: string;
  secure?: boolean;
  onChangeText?: (text: string) => void;
  color?: "primary" | "secondary";
}
