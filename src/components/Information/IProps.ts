import { KeyboardType } from "react-native";

export interface IProps {
  header: string;
  info: string;
  onChangeText: (text: string) => void;
  isEditable: boolean;
  multiText?: boolean;
  type: KeyboardType;
}
