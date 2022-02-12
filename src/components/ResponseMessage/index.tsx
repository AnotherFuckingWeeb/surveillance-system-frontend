import React, { FunctionComponent } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Images } from "../../../assets";
import { IProps } from "./IProps";

export const ResponseMessage: FunctionComponent<IProps> = ({
  image,
  sucess,
  message,
}): JSX.Element => {
  return (
    <View style={styles.rootContainer}>
      <View style={[styles.container, sucess ? styles.success : styles.error]}>
        <Image style={styles.image} source={image} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  message: {
    color: "white",
    fontWeight: "900",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  success: {
    backgroundColor: "#2ECC71",
  },
  error: {
    backgroundColor: "#FF005D",
  },
});
