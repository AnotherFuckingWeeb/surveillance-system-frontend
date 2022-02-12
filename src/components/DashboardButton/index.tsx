import React, { FunctionComponent } from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { IProps } from "./IProps";

export const DashboardButton: FunctionComponent<IProps> = ({
  image,
  text,
  onPress,
}): JSX.Element => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        width: 300,
        height: 80,
        padding: 10,
        borderRadius: 4,
        backgroundColor: "#23396F",
      }}
      onPress={onPress}
    >
      <>
        <Image
          style={{ width: 60, height: 60, marginRight: 15 }}
          source={image}
        />
        <Text style={{ fontSize: 18, color: "white", fontWeight: "800" }}>
          {text}
        </Text>
      </>
    </TouchableOpacity>
  );
};
