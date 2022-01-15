import { Animated } from "react-native";

export const HeartBeatAnimation = (
  value: Animated.Value,
  minValue: number,
  maxValue: number
) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        toValue: maxValue,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: minValue,
        duration: 800,
        useNativeDriver: true,
      }),
    ])
  ).start();
};
