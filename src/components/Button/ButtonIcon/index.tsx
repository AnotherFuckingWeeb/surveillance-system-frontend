import React, { FunctionComponent } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { IProps } from "./IProps";

export const ButtonIcon: FunctionComponent<IProps> = ({
  children,
  OnPress,
}): JSX.Element => {
  return (
    <TouchableOpacity onPress={OnPress}>
      <View style={styles.container}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5,
  },
});
