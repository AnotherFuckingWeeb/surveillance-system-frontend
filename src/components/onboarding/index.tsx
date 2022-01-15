import { View, Text, FlatList, StyleSheet } from "react-native";
import { OnBoardingItem } from "../on-boarding-item";
import { slices } from "./slices";

export const OnBoarding = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <FlatList
        data={slices}
        renderItem={({ index, item }) => (
          <OnBoardingItem
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        )}
      />
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
