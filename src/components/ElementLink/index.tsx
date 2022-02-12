import React, { FunctionComponent } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { IProps } from "./IProps";

export const ElementLink: FunctionComponent<IProps> = ({
  image,
  header,
  subHeader,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, styles.elevation]}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image style={styles.image} source={image} />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.header}>{header}</Text>
            <Text style={styles.subHeader}>{subHeader}</Text>
          </View>
        </View>
        <AntDesign style={styles.arrow} name="right" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
    marginTop: 20,
    borderRadius: 4,
    margin: 5,
    padding: 10,
    backgroundColor: "white",
  },
  header: {
    fontSize: 18,
    color: "#23396F",
    fontWeight: "800",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    color: "#808080",
  },
  elevation: {
    elevation: 20,
    shadowColor: "black",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  arrow: {
    fontSize: 20,
    color: "#808080",
  },
});
