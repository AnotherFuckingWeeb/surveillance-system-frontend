import React, { FunctionComponent, useState, useEffect } from "react";
import { Modal, View, ScrollView, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DataModalElement } from "../DataModalElement";
import { GetCameras } from "../../../axios";
import { IProps } from "./IProps";
import { IState } from "./IState";

export const DataListModal: FunctionComponent<IProps> = ({
  header,
  elementImage,
  isModalVisible,
  onPressElement,
  onClose,
}): JSX.Element => {
  const [state, setState] = useState<IState>({
    cameras: [],
    loading: false,
  });

  const Header = (): JSX.Element => {
    return (
      <View
        style={{
          width: "100%",
          height: 100,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          backgroundColor: "#23396F",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>{header}</Text>
        <Ionicons
          style={{ fontSize: 24, color: "white" }}
          name="close"
          onPress={onClose}
        />
      </View>
    );
  };

  const fetchCameras = async (): Promise<void> => {
    setState({
      ...state,
      loading: true,
    });

    try {
      await GetCameras().then((cameras) => {
        setState({
          cameras: cameras ? cameras : [],
          loading: false,
        });
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });

      console.error(error);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  return (
    <Modal animationType="slide" visible={isModalVisible} statusBarTranslucent>
      <Header />
      <ScrollView style={{ marginTop: 20, padding: 10 }}>
        {state.cameras.map((camera, index): JSX.Element => {
          return (
            <DataModalElement
              key={index}
              image={elementImage}
              id={camera.id}
              text={camera.area}
              onPress={() => onPressElement(camera)}
            />
          );
        })}
      </ScrollView>
    </Modal>
  );
};
