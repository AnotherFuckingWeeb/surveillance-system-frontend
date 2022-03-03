import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import { NavigationProps } from "../../Route/types";
import { StatusBar } from "expo-status-bar";
import { Images } from "../../../assets";
import { ElementLink } from "../../components/ElementLink";
import { GetCameras, GetCamerasByUid } from "../../../axios";
import { Loading } from "../../components/Loading";
import { EmptyPlaceholder } from "../../components/EmptyPlaceholder";
import { useUser } from "../../context";
import { IState } from "./IState";
import { styles } from "./styles";

export const Cameras = ({ route, navigation }: NavigationProps<"Cameras">) => {
  const [state, setState] = useState<IState>({
    cameras: [],
    loading: false,
  });

  const { user, logout } = useUser();

  const fetchCameras = async (): Promise<void> => {
    setState({
      ...state,
      loading: true,
    });

    try {
      await GetCameras().then((cameras) => {
        setState({
          ...state,
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

  const fetchCamerasByUid = async (): Promise<void> => {
    setState({
      ...state,
      loading: true,
    });

    try {
      await GetCamerasByUid(user.id).then((cameras) => {
        setState({
          ...state,
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

  const redirectTo = (id: number): void => {
    if (route.params.redirectTo === "manage") {
      navigation.navigate("CameraInfo", {
        id,
      });
    } else {
      navigation.navigate("Camera", {
        id,
      });
    }
  };

  const onHandleLogout = async (): Promise<void> => {
    await logout().then(() => {
      navigation.navigate("Login");
    });
  };

  const CameraList = (): JSX.Element => {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 28, color: "white", marginRight: 40 }}>
            Cámaras
          </Text>
          {user.role === 0 && (
            <Button title="Cerrar Sesión" onPress={onHandleLogout} />
          )}
        </View>
        <ScrollView>
          {state.cameras.map((camera, index): JSX.Element => {
            return (
              <ElementLink
                key={index}
                image={Images.camera}
                header={camera.area}
                subHeader={camera.brand}
                onPress={() => redirectTo(camera.id)}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  };

  useEffect(() => {
    if (user.role === 1) {
      fetchCameras();
    } else {
      fetchCamerasByUid();
    }
  }, []);

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      {state.cameras ? (
        <CameraList />
      ) : (
        <EmptyPlaceholder text="No hay cámaras disponibles" />
      )}
      <StatusBar animated backgroundColor="#23396F" />
    </View>
  );
};
