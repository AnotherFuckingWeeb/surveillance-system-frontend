import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IProps } from "./IProps";

export const EmptyPlaceholder: FunctionComponent<IProps> = ({
  text,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
});
