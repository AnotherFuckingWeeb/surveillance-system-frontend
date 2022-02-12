import React, { FunctionComponent } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IProps } from "./IProps";

export const ElementContainer: FunctionComponent<IProps> = ({
  image,
  text,
  displayDeleteButton,
  onPress,
  onCancellable,
}): JSX.Element => {
  const XButton = (): JSX.Element => {
    return (
      <TouchableWithoutFeedback
        onPress={(event) => {
          event.preventDefault();
          onCancellable();
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: 5,
          }}
        >
          <Ionicons style={{ fontSize: 18 }} name="close" />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {displayDeleteButton && <XButton />}
        <Image style={styles.image} source={image} />
        <Text style={{ textAlign: "center" }}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 100,
    height: 100,
    margin: 5,
    padding: 4,
    borderRadius: 4,
    position: "relative",
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  text: {
    fontSize: 13,
    color: "#23396F",
  },
});
