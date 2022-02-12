import { FunctionComponent } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { IProps } from "../IProps";

export const PrimaryButton: FunctionComponent<IProps> = ({
  text,
  OnPress,
}): JSX.Element => {
  return (
    <TouchableOpacity style={styles.button} onPress={OnPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    borderRadius: 4,
    backgroundColor: "#23396F",
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
  },
});
