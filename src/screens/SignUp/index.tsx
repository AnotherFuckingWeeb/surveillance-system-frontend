import { StyleSheet, View } from "react-native";
import { OnBoarding } from "../../components/OnBoarding";
import { NavigationProps } from "../../Route/types";

export const SignUp = (props: NavigationProps<"SignUp">): JSX.Element => {
  return (
    <View style={styles.container}>
      <OnBoarding navProps={props} />
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
