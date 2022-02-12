import React, { FunctionComponent } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { IProps } from "./IProps";

export const CustomInput: FunctionComponent<IProps> = ({
  value,
  label,
  placeholder,
  type,
  secure,
  color,
  onChangeText,
}): JSX.Element => {
  let styleColor;

  switch (color) {
    case "primary":
      styleColor = styles.primaryColor;
      break;
    case "secondary":
      styleColor = styles.secondaryColor;
      break;
    default:
      styleColor = styles.primaryColor;
      break;
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, styleColor, { height: 40 }]}
        secureTextEntry={secure}
        keyboardType={type}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export const DescriptionInput: FunctionComponent<IProps> = ({
  value,
  label,
  placeholder,
  type,
  color,
  onChangeText,
}): JSX.Element => {
  let styleColor;

  switch (color) {
    case "primary":
      styleColor = styles.primaryColor;
      break;
    case "secondary":
      styleColor = styles.secondaryColor;
      break;
    default:
      styleColor = styles.primaryColor;
      break;
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          styleColor,
          { height: 100, textAlignVertical: "top" },
        ]}
        value={value}
        placeholder={placeholder}
        keyboardType={type}
        multiline={true}
        numberOfLines={4}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    padding: 10,
    borderWidth: 2,
    borderRadius: 4,
    fontFamily: "OpenSans-Regular",
    marginBottom: 10,
  },
  label: {
    color: "#808080",
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    marginBottom: 5,
  },
  primaryColor: {
    borderColor: "#23396F",
    color: "#23396F",
  },
  secondaryColor: {
    borderColor: "white",
    color: "white",
  },
});
