import React, { FunctionComponent } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { IProps } from "./IProps";

export const DataModalElement: FunctionComponent<IProps> = ({
  id,
  image,
  text,
  onPress,
}): JSX.Element => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#f2f3f4",
        marginVertical: 5,
      }}
      onPress={onPress}
    >
      <>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
              marginRight: 18,
            }}
            source={image}
          />
          <Text style={{ fontSize: 18, color: "#808080" }}>{text}</Text>
        </View>
        <AntDesign style={{ fontSize: 20, color: "#808080" }} name="right" />
      </>
    </TouchableOpacity>
  );
};
