import React, { FunctionComponent } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { IProps } from "./IProps";

export const SecondaryButton: FunctionComponent<IProps> = ({
  text,
  color,
  OnPress,
}): JSX.Element => {
  let colorStyle;

  switch (color) {
    case "primary":
      colorStyle = styles.primaryColor;
      break;

    case "secondary":
      colorStyle = styles.secondaryColor;
      break;

    default:
      colorStyle = styles.primaryColor;
      break;
  }

  return (
    <TouchableOpacity style={[styles.container, colorStyle]} onPress={OnPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
    margin: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
  primaryColor: {
    backgroundColor: "#23396F",
  },
  secondaryColor: {
    backgroundColor: "#D21F3C",
  },
});
