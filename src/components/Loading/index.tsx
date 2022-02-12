import React, { useState, useEffect } from "react";
import { Animated, Modal, View, Image, StyleSheet } from "react-native";
import { Images } from "../../../assets";
import { PulseAnimation } from "../../animations/PulseAnimation";

export const Loading = (): JSX.Element => {
  const animation = new Animated.Value(1);

  useEffect(() => {
    PulseAnimation(animation, 0, 1);
  }, []);

  const animatedStyle = {
    opacity: animation,
  };

  return (
    <Modal transparent statusBarTranslucent>
      <View style={styles.kontainer}>
        <Animated.Image
          source={Images.logo}
          style={[styles.image, animatedStyle]}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  kontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
});
