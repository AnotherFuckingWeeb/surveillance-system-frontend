import React, { FunctionComponent } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IProps } from "./IProps";

export const LengthContainer: FunctionComponent<IProps> = ({
  title,
  image,
  length,
}): JSX.Element => {
  return (
    <View style={styles.lengthContainer}>
      <View style={styles.titleContainer}>
        <Image style={styles.image} source={image} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Text style={styles.length}>{length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lengthContainer: {
    width: 150,
    height: 180,
    padding: 4,
    backgroundColor: "#23396F",
    borderRadius: 4,
    marginHorizontal: 5,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    color: "white",
  },
  length: {
    fontSize: 80,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
