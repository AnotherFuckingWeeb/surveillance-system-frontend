import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { NavigationProps } from "../../Route/types";
import { StatusBar } from "expo-status-bar";
import { Images } from "../../../assets";
import { ElementLink } from "../../components/ElementLink";
import { GetCameras } from "../../../axios";
import { Loading } from "../../components/Loading";
import { IState } from "./IState";
import * as SecureStore from "expo-secure-store";

export const Cameras = ({ route, navigation }: NavigationProps<"Cameras">) => {
  const [state, setState] = useState<IState>({
    cameras: [],
    loading: false,
  });

  const fetchCameras = async (): Promise<void> => {
    setState({
      ...state,
      loading: true,
    });

    try {
      await GetCameras().then((cameras) => {
        setState({
          cameras,
          loading: false,
        });
      });
    } catch (error) {
      console.error(error);
      setState({
        ...state,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      <Text style={{ fontSize: 28, color: "white" }}>Camaras</Text>
      <ScrollView>
        {state.cameras.map((camera, index): JSX.Element => {
          return (
            <ElementLink
              key={index}
              image={Images.camera}
              header={camera.area}
              subHeader={camera.brand}
              onPress={() => {
                navigation.navigate("CameraInfo", {
                  id: camera.id,
                });
              }}
            />
          );
        })}
      </ScrollView>
      <StatusBar animated backgroundColor="#23396F" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#23396F",
    paddingVertical: 45,
    paddingHorizontal: 10,
  },
  card: {
    display: "flex",
    flexDirection: "row",
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
});
