import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationProps } from "../../Route/types";
import { Video, AVPlaybackStatus } from "expo-av";
import { ROOT_URL, GetCamera } from "../../../axios";

enum StaticCameras {
  garita = 8,
  SalaDeDespacho = 7,
  SalaDeMandoUno = 2,
  SalaDeMandoDos = 4,
  SalaDeMandoTres = 5,
  SalaHFUno = 10,
  SalaHFDos = 12,
}

export const Camera = ({
  route,
  navigation,
}: NavigationProps<"Camera">): JSX.Element => {
  const { width, height } = useWindowDimensions();
  const video = useRef(null);

  const [title, setTitle] = useState<string>("");

  const fetchCameraTitle = async (): Promise<void> => {
    await GetCamera(route.params.id).then((camera) => {
      setTitle(camera.area);
    });
  };

  const getRandomVideo = (): string => {
    const ENDPOINT = `${ROOT_URL}/public/videos/`;
    const EXT = ".mp4";
    const randomInt = Math.floor(Math.random() * (12 - 1)) + 1;

    return ENDPOINT + randomInt.toString() + EXT;
  };

  const getVideoByStaticCamera = (): string => {
    const ENDPOINT = `${ROOT_URL}/public/videos/`;
    const EXT = ".mp4";
    let videoInt: number = 0;

    switch (title) {
      case "Garita":
        videoInt = StaticCameras.garita;
        break;
      case "Sala de despacho":
        videoInt = StaticCameras.SalaDeDespacho;
        break;
      case "Sala de mando 1":
        videoInt = StaticCameras.SalaDeMandoUno;
        break;
      case "Sala de mando 2":
        videoInt = StaticCameras.SalaDeMandoTres;
        break;
      case "Sala de mando 3":
        videoInt = StaticCameras.SalaDeMandoTres;
        break;
      case "Sala HF 1":
        videoInt = StaticCameras.SalaHFUno;
        break;
      case "Sala HF 2":
        videoInt = StaticCameras.SalaHFDos;
        break;
      default:
        return getRandomVideo();
        break;
    }

    return ENDPOINT + videoInt.toString() + EXT;
  };

  useEffect(() => {
    fetchCameraTitle();
  });

  return (
    <View style={styles.container}>
      <View style={{ height }}>
        <Video
          ref={video}
          style={{
            width,
            height,
          }}
          source={{
            uri: getVideoByStaticCamera(),
          }}
          shouldPlay
          isLooping
          resizeMode="cover"
        />
      </View>
      <StatusBar animated backgroundColor="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
