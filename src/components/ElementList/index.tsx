import React, { FunctionComponent } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { ElementContainer } from "../ElementContainer";
import { Ionicons } from "@expo/vector-icons";
import { IProps } from "./IProps";

export const ElementList: FunctionComponent<IProps> = ({
  header,
  dataIcon,
  cameras,
  readOnly,
  onPressButton,
  onPressCancellableButton,
}): JSX.Element => {
  const AddElementButton = (): JSX.Element => {
    return (
      <TouchableWithoutFeedback onPress={onPressButton}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            margin: 5,
            borderRadius: 4,
            backgroundColor: "white",
          }}
        >
          <Ionicons style={{ fontSize: 38, color: "#23396F" }} name="add" />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const ScrollableElements = (): JSX.Element => {
    return (
      <ScrollView contentContainerStyle={{ alignItems: "center" }} horizontal>
        {cameras.map((camera): JSX.Element => {
          return (
            <ElementContainer
              key={camera.id}
              image={dataIcon}
              text={camera.area}
              displayDeleteButton={readOnly}
              onCancellable={() => onPressCancellableButton(camera.id)}
              onPress={() => alert("hello")}
            />
          );
        })}
        {readOnly && <AddElementButton />}
      </ScrollView>
    );
  };

  const EmptyPlaceholder = (): JSX.Element => {
    return (
      <View style={styles.emptyPlaceholder}>
        <Text>No hay elementos asignados</Text>
      </View>
    );
  };

  return (
    <View style={styles.usersAssigned}>
      <Text style={styles.userText}>{header}</Text>
      {cameras.length === 0 && !readOnly ? (
        <EmptyPlaceholder />
      ) : (
        <ScrollableElements />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  usersAssigned: {
    flex: 1,
    padding: 10,
    backgroundColor: "#23396F",
    margin: 5,
    borderRadius: 4,
  },
  userText: {
    fontSize: 14,
    color: "white",
    marginBottom: 10,
  },
  emptyPlaceholder: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
});
