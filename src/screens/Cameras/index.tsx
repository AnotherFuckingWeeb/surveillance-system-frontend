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
import { GetCameras, GetCamerasByUid, ROOT_URL } from "../../../axios";
import { Loading } from "../../components/Loading";
import { EmptyPlaceholder } from "../../components/EmptyPlaceholder";
import { useUser } from "../../context";
import { IState } from "./IState";
import { styles } from "./styles";
import { NotificationModal } from "../../components/NotificationModal";
import { ButtonIcon } from "../../components/Button/ButtonIcon";
import AntDesign from "@expo/vector-icons/AntDesign";
import { downloadFile } from "../../../utils/download-file";

export const Cameras = ({ route, navigation }: NavigationProps<"Reports">) => {
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
        {route.params.redirectTo === "watch" && user.role === 0 && (
          <NotificationModal />
        )}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 28, color: "white" }}>Cámaras</Text>
          {user.role === 0 && (
            <View
              style={{
                marginLeft: 20,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ButtonIcon
                OnPress={() =>
                  downloadFile(
                    `${ROOT_URL}/public/pdfs/MANUAL_DE_USUARIO_user.pdf`
                  )
                }
              >
                <AntDesign style={{ fontSize: 24, margin: 5 }} name="book" />
              </ButtonIcon>
              <ButtonIcon OnPress={() => navigation.navigate("Reports")}>
                <AntDesign style={{ fontSize: 24, margin: 5 }} name="user" />
              </ButtonIcon>
              <ButtonIcon OnPress={() => navigation.navigate("CreateReport")}>
                <AntDesign style={{ fontSize: 24, margin: 5 }} name="plus" />
              </ButtonIcon>
              <ButtonIcon OnPress={onHandleLogout}>
                <AntDesign style={{ fontSize: 24, margin: 5 }} name="logout" />
              </ButtonIcon>
            </View>
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
        <ElementLink
          image={Images.camera}
          header="Centro de comandos"
          subHeader="EPSON"
          onPress={() => alert("Camara inoperable")}
          inoperable
        />
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
