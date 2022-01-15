import { useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Images } from "../../assets";
import { HeartBeatAnimation } from "../animations/heartbeat";

export const Splash = (): JSX.Element => {
  const animation = new Animated.Value(1);

  useEffect(() => {
    HeartBeatAnimation(animation, 0, 1);
  }, []);

  const animatedStyle = {
    opacity: animation,
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.logo, animatedStyle]}
        source={Images.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
