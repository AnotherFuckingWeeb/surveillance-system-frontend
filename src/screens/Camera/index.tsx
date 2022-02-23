import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationProps } from "../../Route/types";
import { Video, AVPlaybackStatus } from "expo-av";

export const Camera = ({
  route,
  navigation,
}: NavigationProps<"Camera">): JSX.Element => {
  const { width, height } = useWindowDimensions();
  const video = useRef(null);

  const getRandomVideo = (): string => {
    const ENDPOINT = "http://192.168.0.103:8080/public/videos/";
    const EXT = ".mp4";
    const randomInt = Math.floor(Math.random() * (12 - 1)) + 1;

    return ENDPOINT + randomInt.toString() + EXT;
  };

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
            uri: getRandomVideo(),
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
