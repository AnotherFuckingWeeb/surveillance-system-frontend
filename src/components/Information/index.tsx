import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomInput, DescriptionInput } from "../CustomInput";
import { IProps } from "./IProps";

export const Information: FunctionComponent<IProps> = ({
  header,
  info,
  onChangeText,
  isEditable,
  multiText,
  type,
}): JSX.Element => {
  const InfoContainer = (): JSX.Element => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{info}</Text>
      </View>
    );
  };

  const RenderInput = (): JSX.Element => {
    return (
      <>
        {multiText ? (
          <DescriptionInput
            value={info}
            type="default"
            color="secondary"
            onChangeText={onChangeText}
          />
        ) : (
          <CustomInput
            value={info}
            color="secondary"
            type="default"
            onChangeText={onChangeText}
          />
        )}
      </>
    );
  };

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.header}>{header}</Text>
      {isEditable ? (
        multiText ? (
          <DescriptionInput
            value={info}
            type="default"
            color="secondary"
            onChangeText={onChangeText}
          />
        ) : (
          <CustomInput
            value={info}
            color="secondary"
            type={type}
            onChangeText={onChangeText}
          />
        )
      ) : (
        <InfoContainer />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: "#23396F",
    borderRadius: 4,
  },
  header: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
  },
  contentContainer: {
    width: "100%",
    padding: 15,
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: "white",
  },
  contentText: {
    fontSize: 18,
    color: "#23396F",
    fontWeight: "bold",
    textAlign: "center",
  },
});
