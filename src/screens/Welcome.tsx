import { StyleSheet, View, Text } from "react-native";
import { OnBoarding } from "../components/onboarding/";

export const Welcome = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <OnBoarding />
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
});
