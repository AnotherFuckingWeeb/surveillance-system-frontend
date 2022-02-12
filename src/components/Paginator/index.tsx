import { FunctionComponent } from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
import { IProps } from "./IProps";

export const Paginator: FunctionComponent<{
  data: any;
  scrollX: any;
}> = ({ data, scrollX }): JSX.Element => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: "row", height: 64, marginTop: 60 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#23396F",
  },
});
